import Link from "next/link";
import { getPublicProductData } from "@/lib/publicProduct";
import { TrendingDown } from "lucide-react";
import { formatMoney } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getPublicProductData(id);

  if (!data) {
    return { title: "Product not found — DealDrop" };
  }

  const { product } = data;
  const priceText = formatMoney(product.current_price, product.currency);

  return {
    title: `${product.name} — DealDrop`,
    description: `Currently ${priceText} on DealDrop. Tracked with daily price history.`,
  };
}

const ACCENT = "#B7791F";

function formatShortDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

function HistoryChart({ history, currency }) {
  if (!history || history.length < 2) return null;

  const prices = history.map((h) => parseFloat(h.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  // Extra top padding so the max label can sit above the line's high point.
  const width = 600;
  const height = 180;
  const padX = 6;
  const padY = 26;

  const points = prices.map((price, i) => {
    const x = padX + (i / (prices.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (price - min) / range) * (height - padY * 2);
    return { x, y, price };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const first = points[0];
  const last = points[points.length - 1];

  const firstDate = formatShortDate(history[0].checked_at);
  const lastDate = formatShortDate(history[history.length - 1].checked_at);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-medium text-[#6B7280]">
          Recorded Price Trend
        </h4>
        <span className="font-mono text-[11px] text-[#6B7280]">
          {history.length} check{history.length === 1 ? "" : "s"}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[180px]"
        role="img"
        aria-label="Price history trend"
      >
        <line x1="0" y1={padY} x2={width} y2={padY} stroke="#E4E4E0" strokeWidth="1" />
        <line
          x1="0"
          y1={height - padY}
          x2={width}
          y2={height - padY}
          stroke="#E4E4E0"
          strokeWidth="1"
        />
        <polyline
          points={polyline}
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Highest recorded price */}
        <text
          x="2"
          y="12"
          fill="#6B7280"
          fontSize="11"
          fontFamily="var(--font-geist-mono)"
        >
          {formatMoney(max, currency)}
        </text>
        {/* Lowest recorded price */}
        <text
          x="2"
          y={height - 4}
          fill="#6B7280"
          fontSize="11"
          fontFamily="var(--font-geist-mono)"
        >
          {formatMoney(min, currency)}
        </text>
        {/* Start and end dots */}
        <circle cx={first.x} cy={first.y} r="3" fill={ACCENT} />
        <circle cx={last.x} cy={last.y} r="3" fill={ACCENT} />
      </svg>
      <div className="flex items-center justify-between mt-1">
        <span className="font-mono text-[11px] text-[#6B7280]">{firstDate}</span>
        <span className="font-mono text-[11px] text-[#6B7280]">{lastDate}</span>
      </div>
    </div>
  );
}

function SinglePricePoint({ history, currency }) {
  const entry = history[0];
  const price = formatMoney(entry.price, currency);
  const date = formatShortDate(entry.checked_at);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-medium text-[#6B7280]">
          Recorded Price Trend
        </h4>
        <span className="font-mono text-[11px] text-[#6B7280]">
          1 check
        </span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-lg font-semibold text-accent-text">
          {price}
        </span>
        <span className="font-mono text-[11px] text-[#6B7280]">
          on {date}
        </span>
      </div>
    </div>
  );
}

export default async function SharePage({ params }) {
  const { id } = await params;
  const data = await getPublicProductData(id);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#FAFAF9] text-[#14171F] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm p-8 max-w-sm w-full shadow-xs">
          <h1 className="text-lg font-semibold text-[#14171F] mb-2">
            This product isn&apos;t being tracked.
          </h1>
          <p className="text-xs text-[#6B7280] mb-6">
            The product you&apos;re looking for may have been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full h-9 rounded-md bg-[#B7791F] hover:bg-[#9f6919] text-[#14171F] font-semibold text-xs focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-2 focus-visible:outline-none transition-colors shadow-xs"
          >
            Back to DealDrop
          </Link>
        </div>
      </main>
    );
  }

  const { product, history } = data;
  const trackedSince = new Date(product.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#14171F]">
      <header className="border-b border-[#E4E4E0] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            aria-label="dealdrop — home"
            className="flex items-baseline gap-1.5 min-w-0 shrink-0 rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9]"
          >
            <TrendingDown className="w-5 h-5 stroke-[2.25] text-[#B7791F] self-center shrink-0" aria-hidden="true" />
            <span className="font-sans font-semibold text-base tracking-tight text-[#14171F]">
              dealdrop
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {product.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                width={128}
                height={128}
                loading="lazy"
                decoding="async"
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-sm border border-[#E4E4E0] bg-[#FAFAF9] shrink-0"
              />
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#14171F] leading-snug mb-3">
                {product.name}
              </h1>
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#B7791F] tracking-tight">
                {formatMoney(product.current_price, product.currency)}
              </div>
              <p className="text-xs text-[#6B7280] mt-3">
                Tracked since {trackedSince}
              </p>
            </div>
          </div>

          <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm shadow-xs p-4 sm:p-5">
            {history.length === 0 && (
              <p className="text-center py-6 text-[#6B7280] w-full text-xs">
                No price history recorded yet.
              </p>
            )}
            {history.length === 1 && (
              <SinglePricePoint history={history} currency={product.currency} />
            )}
            {history.length >= 2 && (
              <HistoryChart history={history} currency={product.currency} />
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E4E4E0] bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 py-5 text-center">
          <Link
            href="/"
            className="text-xs text-[#6B7280] hover:text-[#8A5A12] transition-colors"
          >
            Tracked with DealDrop
          </Link>
        </div>
      </footer>
    </div>
  );
}
