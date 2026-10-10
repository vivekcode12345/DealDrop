import Link from "next/link";
import { getPublicProductData } from "@/lib/publicProduct";
import { TrendingDown } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getPublicProductData(id);

  if (!data) {
    return { title: "Product not found — DealDrop" };
  }

  const { product } = data;
  const priceText = `${product.currency} ${product.current_price}`;

  return {
    title: `${product.name} — DealDrop`,
    description: `Currently ${priceText} on DealDrop. Tracked with daily price history.`,
  };
}

const ACCENT = "#B7791F";

function formatPrice(price, currency) {
  const num = parseFloat(price);
  if (Number.isNaN(num)) return `${currency || ""} —`.trim();
  return `${currency || ""} ${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`.trim();
}

function HistoryChart({ history }) {
  if (!history || history.length < 2) return null;

  const prices = history.map((h) => parseFloat(h.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const width = 600;
  const height = 180;
  const padX = 6;
  const padY = 14;

  const points = prices.map((price, i) => {
    const x = padX + (i / (prices.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (price - min) / range) * (height - padY * 2);
    return { x, y };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

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
      </svg>
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
            <TrendingDown className="w-5 h-5 stroke-[2.25] text-[#B7791F] self-center shrink-0" />
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
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-sm border border-[#E4E4E0] bg-[#FAFAF9] shrink-0"
              />
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-[#14171F] leading-snug mb-3">
                {product.name}
              </h1>
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#B7791F] tracking-tight">
                {formatPrice(product.current_price, product.currency)}
              </div>
              <p className="text-xs text-[#6B7280] mt-3">
                Tracked since {trackedSince}
              </p>
            </div>
          </div>

          <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm shadow-xs p-4 sm:p-5">
            {history.length >= 2 ? (
              <HistoryChart history={history} />
            ) : (
              <p className="text-center py-6 text-[#6B7280] w-full text-xs">
                No price history recorded yet.
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E4E4E0] bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 py-5 text-center">
          <Link
            href="/"
            className="text-xs text-[#6B7280] hover:text-[#B7791F] transition-colors"
          >
            Tracked with DealDrop
          </Link>
        </div>
      </footer>
    </div>
  );
}
