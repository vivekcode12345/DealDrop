import { scrapeProduct } from "@/lib/firecrawl";
import { sendPriceDropAlert } from "@/lib/email";

/**
 * Scrapes the product's current price, logs it to price_history,
 * updates the products row, and sends an alert email if a price drop
 * (or reached target price) condition is met.
 *
 * Alerting logic:
 * - If product.target_price is set: alert only if newPrice <= target_price
 * - If product.target_price is null: alert on any price decrease (newPrice < oldPrice)
 *
 * @param {import("@supabase/supabase-js").SupabaseClient} supabase
 * @param {object} product
 * @returns {Promise<{ status: "updated" | "failed", priceChanged: boolean, alertSent: boolean, product?: object }>}
 */
export async function checkProductPrice(supabase, product) {
  try {
    const productData = await scrapeProduct(product.url);
    console.log("[priceCheck] scraped:", JSON.stringify(productData));

    if (!productData?.currentPrice) {
      return { status: "failed", priceChanged: false, alertSent: false };
    }

    const newPrice = parseFloat(productData.currentPrice);
    if (Number.isNaN(newPrice)) {
      return { status: "failed", priceChanged: false, alertSent: false };
    }

    const oldPrice = parseFloat(product.current_price);
    console.log(
      "[priceCheck] oldPrice:",
      oldPrice,
      "newPrice:",
      newPrice,
      "priceChanged:",
      oldPrice !== newPrice
    );
    const currency = productData.currencyCode || product.currency;
    const name = productData.productName || product.name;
    const imageUrl = productData.productImageUrl || product.image_url;
    const updatedAt = new Date().toISOString();

    const { data: updatedProduct, error: updateError } = await supabase
      .from("products")
      .update({
        current_price: newPrice,
        currency,
        name,
        image_url: imageUrl,
        updated_at: updatedAt,
      })
      .eq("id", product.id)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error(`Failed to update product ${product.id}:`, updateError);
      return { status: "failed", priceChanged: false, alertSent: false };
    }

    let priceChanged = false;
    let alertSent = false;

    if (oldPrice !== newPrice) {
      const { error: historyError } = await supabase
        .from("price_history")
        .insert({
          product_id: product.id,
          price: newPrice,
          currency,
        });

      if (historyError) {
        console.error(
          `Failed to record price history for ${product.id}:`,
          historyError
        );
        return { status: "failed", priceChanged: false, alertSent: false };
      }

      priceChanged = true;

      console.log(
        "[priceCheck] target_price:",
        product.target_price,
        "typeof:",
        typeof product.target_price
      );

      const targetPrice =
        product.target_price !== null && product.target_price !== undefined
          ? parseFloat(product.target_price)
          : null;

      const shouldAlert =
        targetPrice !== null
          ? newPrice <= targetPrice
          : newPrice < oldPrice;
      console.log("[priceCheck] shouldAlert:", shouldAlert);

      if (shouldAlert) {
        let recipientEmail = null;

        // In service-role context (cron), supabase.auth.admin exists.
        // In user context (Check Now), fetch user via admin or auth.getUser.
        if (supabase?.auth?.admin?.getUserById) {
          const { data } = await supabase.auth.admin.getUserById(
            product.user_id
          );
          recipientEmail = data?.user?.email || null;
        } else if (supabase?.auth?.getUser) {
          const { data } = await supabase.auth.getUser();
          recipientEmail = data?.user?.email || null;
        }

        if (recipientEmail) {
          console.log(
            "[priceCheck] calling sendPriceDropAlert for user:",
            product.user_id || recipientEmail
          );
          const emailResult = await sendPriceDropAlert(
            recipientEmail,
            product,
            oldPrice,
            newPrice,
            targetPrice
          );
          console.log("[priceCheck] email result:", JSON.stringify(emailResult));

          if (emailResult?.success) {
            alertSent = true;
          }
        }
      }
    }

    return {
      status: "updated",
      priceChanged,
      alertSent,
      product: updatedProduct || {
        ...product,
        current_price: newPrice,
        currency,
        name,
        image_url: imageUrl,
        updated_at: updatedAt,
      },
    };
  } catch (error) {
    console.error("[priceCheck] error:", error);
    console.error(`Error processing product ${product.id}:`, error);
    return { status: "failed", priceChanged: false, alertSent: false };
  }
}
