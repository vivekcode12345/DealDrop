import { ImageResponse } from "next/og";
import { getPublicProductData } from "@/lib/publicProduct";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#B7791F";
const BG = "#FAFAF9";
const TEXT = "#14171F";
const MUTED = "#6B7280";
const BORDER = "#E4E4E0";

function truncate(str, max) {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max - 1).trimEnd()}…` : str;
}

function formatPrice(price, currency) {
  const num = parseFloat(price);
  if (Number.isNaN(num)) return String(price ?? "");
  return `${currency || ""} ${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`.trim();
}

function buildSparkline(history) {
  const points = (history || [])
    .map((h) => parseFloat(h.price))
    .filter((n) => !Number.isNaN(n));

  if (points.length < 2) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const width = 900;
  const height = 160;
  const padY = 20;

  return points
    .map((price, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = padY + (1 - (price - min) / range) * (height - padY * 2);
      return `${x},${y}`;
    })
    .join(" ");
}


export default async function Image({ params }) {
  const { id } = await params;
  const data = await getPublicProductData(id);

  // Generic branded fallback when the product isn't found.
  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: BG,
            fontFamily: "sans-serif",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", color: ACCENT, fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>
            dealdrop
          </div>
          <div style={{ display: "flex", color: MUTED, fontSize: 34 }}>
            Track product prices and get notified on price drops
          </div>
        </div>
      ),
      size
    );
  }

  const { product, history } = data;
  const sparkline = buildSparkline(history);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BG,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", color: ACCENT, fontSize: 46, fontWeight: 700, letterSpacing: "-0.02em" }}>
          dealdrop
        </div>

        {/* Product name */}
        <div
          style={{
            display: "flex",
            color: TEXT,
            fontSize: 62,
            fontWeight: 600,
            lineHeight: 1.2,
            marginTop: 44,
            maxWidth: 940,
          }}
        >
          {truncate(product.name, 62)}
        </div>

        {/* Current price */}
        <div
          style={{
            display: "flex",
            color: ACCENT,
            fontSize: 96,
            fontWeight: 700,
            marginTop: 32,
            letterSpacing: "-0.02em",
            fontFamily: "monospace",
          }}
        >
          {formatPrice(product.current_price, product.currency)}
        </div>

        <div style={{ display: "flex", flex: 1 }} />

        {/* Sparkline */}
        {sparkline && (
          <div style={{ display: "flex", alignItems: "flex-end", borderTop: `1px solid ${BORDER}`, paddingTop: 28 }}>
            <svg width="900" height="160" viewBox="0 0 900 160">
              <polyline
                points={sparkline}
                fill="none"
                stroke={ACCENT}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    ),
    size
  );
}
