import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropAlert } from "@/lib/email";

export const maxDuration = 300;

const CHUNK_SIZE = 3;

// Scrapes a single product, updates it, records the price change and sends an
// alert when the price drops. Mutates the shared `results` counters and
// returns "updated" or "failed".
async function processProduct(supabase, product, results) {
  try {
    const productData = await scrapeProduct(product.url);

    if (!productData.currentPrice) {
      results.failed++;
      return "failed";
    }

    const newPrice = parseFloat(productData.currentPrice);
    const oldPrice = parseFloat(product.current_price);

    const { error: updateError } = await supabase
      .from("products")
      .update({
        current_price: newPrice,
        currency: productData.currencyCode || product.currency,
        name: productData.productName || product.name,
        image_url: productData.productImageUrl || product.image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", product.id);

    if (updateError) {
      console.error(`Failed to update product ${product.id}:`, updateError);
      results.failed++;
      return "failed";
    }

    if (oldPrice !== newPrice) {
      const { error: historyError } = await supabase
        .from("price_history")
        .insert({
          product_id: product.id,
          price: newPrice,
          currency: productData.currencyCode || product.currency,
        });

      // If the history write fails, treat the product as failed and skip the
      // email so we never notify on an unrecorded price change.
      if (historyError) {
        console.error(
          `Failed to record price history for ${product.id}:`,
          historyError
        );
        results.failed++;
        return "failed";
      }

      results.priceChanges++;

      if (newPrice < oldPrice) {
        const {
          data: { user },
        } = await supabase.auth.admin.getUserById(product.user_id);

        if (user?.email) {
          const emailResult = await sendPriceDropAlert(
            user.email,
            product,
            oldPrice,
            newPrice
          );

          if (emailResult.success) {
            results.alertsSent++;
          }
        }
      }
    }

    results.updated++;
    return "updated";
  } catch (error) {
    console.error(`Error processing product ${product.id}:`, error);
    results.failed++;
    return "failed";
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) throw productsError;

    console.log(`Found ${products.length} products to check`);

    const results = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    for (let i = 0; i < products.length; i += CHUNK_SIZE) {
      const chunk = products.slice(i, i + CHUNK_SIZE);
      await Promise.allSettled(
        chunk.map((product) => processProduct(supabase, product, results))
      );
    }

    return NextResponse.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Price check endpoint is working. Use POST to trigger.",
  });
}
