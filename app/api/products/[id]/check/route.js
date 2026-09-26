import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { checkProductPrice } from "@/lib/priceCheck";

const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

export async function POST(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Rely on RLS and explicit check; must belong to user
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching product:", fetchError);
      return NextResponse.json(
        { error: "Database error" },
        { status: 500 }
      );
    }

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Enforce 5-minute cooldown server-side
    const lastChecked = new Date(product.updated_at || product.created_at).getTime();
    const now = Date.now();
    const elapsed = now - lastChecked;

    if (elapsed < COOLDOWN_MS) {
      const waitMinutes = Math.ceil((COOLDOWN_MS - elapsed) / 60000);
      return NextResponse.json(
        {
          error: `Please wait ${waitMinutes} minute${
            waitMinutes === 1 ? "" : "s"
          } before checking this product again.`,
        },
        { status: 429 }
      );
    }

    const result = await checkProductPrice(supabase, product);

    if (result.status === "failed") {
      return NextResponse.json(
        { error: "Could not fetch updated price from URL" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      product: result.product,
      priceChanged: result.priceChanged,
      alertSent: result.alertSent,
    });
  } catch (error) {
    console.error("Manual check error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to check price" },
      { status: 500 }
    );
  }
}
