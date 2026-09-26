import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkProductPrice } from "@/lib/priceCheck";

export const maxDuration = 300;

const CHUNK_SIZE = 3;

// Scrapes a single product, updates it, records the price change and sends an
// alert when the price drops using the shared checkProductPrice function.
// Mutates the shared `results` counters and returns "updated" or "failed".
async function processProduct(supabase, product, results) {
  const result = await checkProductPrice(supabase, product);

  if (result.status === "failed") {
    results.failed++;
    return "failed";
  }

  if (result.priceChanged) {
    results.priceChanges++;
  }

  if (result.alertSent) {
    results.alertsSent++;
  }

  results.updated++;
  return "updated";
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
