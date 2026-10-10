import { createClient } from "@supabase/supabase-js";

/**
 * Fetches a product and its price history for PUBLIC display (share pages).
 *
 * Uses a service-role client to bypass RLS, exactly like the cron route.
 * Only exposes columns that are safe to show publicly — never user_id, url,
 * or target_price.
 *
 * @param {string} productId
 * @returns {Promise<{ product: object, history: Array } | null>}
 */
export async function getPublicProductData(productId) {
  // Use service role to bypass RLS (same pattern as the cron route)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, current_price, currency, image_url, created_at")
    .eq("id", productId)
    .maybeSingle();

  if (error || !product) return null;

  const { data: history, error: historyError } = await supabase
    .from("price_history")
    .select("price, checked_at")
    .eq("product_id", productId)
    .order("checked_at", { ascending: true });

  if (historyError) {
    return { product, history: [] };
  }

  return { product, history: history || [] };
}
