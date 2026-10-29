"use client";

import { useState, useEffect } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Trash2,
  ChevronDown,
  RefreshCw,
  Loader2,
  Share2,
  ImageOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatMoney } from "@/lib/format";

const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

export default function ProductCard({ product, serverNow, isOpen, onToggle }) {
  const router = useRouter();
  const [showChart, setShowChart] = useState(false);
  const isChartOpen = isOpen ?? showChart;
  const toggleChart = onToggle ?? (() => setShowChart(!showChart));
  const [deleting, setDeleting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  // Seeded from the server render timestamp so the first client render matches
  // the server HTML exactly (no hydration mismatch, no layout shift).
  const [now, setNow] = useState(() =>
    typeof serverNow === "number" ? serverNow : Date.now()
  );

  // Periodically update `now` so cooldown elapsed minutes stay accurate
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const lastChecked = new Date(
    product.updated_at || product.created_at
  ).getTime();
  const elapsedMs = Math.max(0, now - lastChecked);
  const isCooldown = elapsedMs < COOLDOWN_MS;
  const elapsedMinutes = Math.floor(elapsedMs / 60000);

  const handleCheckNow = async () => {
    if (checking || isCooldown) return;

    setChecking(true);
    try {
      const res = await fetch(`/api/products/${product.id}/check`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to check price");
      } else {
        if (data.priceChanged) {
          toast.success(
            `Price updated to ${formatMoney(
              data.product.current_price,
              data.product.currency
            )}`
          );
        } else {
          toast.success("Checked: price unchanged");
        }
        router.refresh();
      }
    } catch (err) {
      console.error("Check now error:", err);
      toast.error("Network error while checking price");
    } finally {
      setChecking(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/share/${product.id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied!");
    } catch (err) {
      console.error("Share error:", err);
      toast.error("Could not copy link");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);
    const result = await deleteProduct(product.id);

    if (result.error) {
      toast.error(result.error);
      setDeleting(false);
    } else {
      toast.success("Product removed");
    }
  };

  const hasTargetPrice =
    product.target_price !== null &&
    product.target_price !== undefined &&
    !Number.isNaN(parseFloat(product.target_price));

  return (
    <div className="border border-[#E4E4E0] hover:border-[#D1D1CB] bg-[#FFFFFF] rounded-sm transition-colors shadow-xs flex flex-col justify-between">
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="flex gap-4 items-start">
          {product.image_url && !imgFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              width={80}
              height={80}
              loading="lazy"
              referrerPolicy="no-referrer"
              decoding="async"
              onError={() => setImgFailed(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-sm border border-[#E4E4E0] bg-[#FAFAF9] shrink-0"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-sm border border-[#E4E4E0] bg-[#F4F4F2] shrink-0">
              <ImageOff className="h-6 w-6 text-[#9CA3AF]" aria-hidden="true" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3
              title={product.name}
              className="font-medium text-sm text-[#14171F] line-clamp-2 h-10 mb-2 leading-snug cursor-default"
            >
              {product.name}
            </h3>

            {/* Price on its own line */}
            <div className="font-mono text-2xl font-bold text-[#B7791F] tabular-nums leading-tight">
              {formatMoney(product.current_price, product.currency)}
            </div>

            {/* One wrapping row of small badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {hasTargetPrice && (
                <span className="inline-flex items-center text-[11px] font-mono text-accent-text border border-[#B7791F]/30 bg-[#B7791F]/10 px-2 py-0.5 rounded-sm font-medium">
                  Target: {formatMoney(product.target_price, product.currency)}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0"
                  aria-hidden="true"
                />
                Tracking daily
              </span>
            </div>
          </div>
        </div>

        {/* Single-row actions: text actions on the left, icon actions on the
            right. The row wraps on narrow screens so the two groups never
            overlap. */}
        <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-[#E4E4E0] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="grid grid-cols-2 gap-2 min-w-0 sm:flex sm:items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCheckNow}
              disabled={checking || isCooldown}
              title={isCooldown ? `Checked recently` : "Check latest price now"}
              className="h-7 w-full justify-center text-xs gap-1 min-w-[8rem] border-[#E4E4E0] bg-[#FAFAF9] text-[#14171F] hover:bg-[#F4F4F2] hover:border-[#D1D1CB] hover:text-[#14171F] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md font-sans transition-colors disabled:opacity-60 sm:w-auto"
            >
              {checking ? (
                <>
                  <Loader2
                    className="w-3.5 h-3.5 animate-spin text-[#B7791F]"
                    aria-hidden="true"
                  />
                  Checking...
                </>
              ) : isCooldown ? (
                <>
                  <RefreshCw className="w-3 h-3 text-[#6B7280]" aria-hidden="true" />
                  Checked {elapsedMinutes === 0 ? "<1m" : `${elapsedMinutes}m`} ago
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3 text-[#B7791F]" aria-hidden="true" />
                  Check Now
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleChart}
              aria-expanded={isChartOpen}
              className="h-7 w-full justify-center text-xs gap-1 border-[#E4E4E0] bg-[#FAFAF9] text-[#14171F] hover:bg-[#F4F4F2] hover:border-[#D1D1CB] hover:text-[#14171F] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md font-sans transition-colors sm:w-auto"
            >
              <ChevronDown
                className={
                  "w-3.5 h-3.5 transition-transform duration-200 " +
                  (isChartOpen ? "rotate-180" : "")
                }
                aria-hidden="true"
              />
              {isChartOpen ? "Hide Chart" : "Price History"}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 shrink-0 ml-auto sm:flex sm:items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              aria-label="Copy share link"
              title="Copy share link"
              className="h-7 w-full justify-center gap-1.5 p-0 border-[#E4E4E0] bg-[#FAFAF9] text-[#14171F] hover:bg-[#F4F4F2] hover:border-[#D1D1CB] hover:text-[#14171F] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md font-sans transition-colors sm:w-8"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs sm:sr-only">Share</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              aria-label="Open product page"
              title="Open product page"
              className="h-7 w-full justify-center gap-1.5 p-0 border-[#E4E4E0] bg-[#FAFAF9] text-[#14171F] hover:bg-[#F4F4F2] hover:border-[#D1D1CB] hover:text-[#14171F] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md font-sans transition-colors sm:w-8"
              nativeButton={false}
              render={
                <Link
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open product page"
                  title="Open product page"
                />
              }
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs sm:sr-only">Open</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              aria-label="Remove product"
              title="Remove product"
              className="h-7 w-full justify-center gap-1.5 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 rounded-md font-sans transition-colors sm:w-8"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-xs sm:sr-only">Remove</span>
            </Button>
          </div>
        </div>
      </div>

      {isChartOpen && (
        <div className="border-t border-[#E4E4E0] bg-[#FAFAF9]/60 p-4 sm:p-5">
          {/* Reserve the chart's height so expanding the panel does not shift
              the surrounding content. */}
          <div className="min-h-[190px]">
            <PriceChart productId={product.id} />
          </div>
        </div>
      )}
    </div>
  );
}
