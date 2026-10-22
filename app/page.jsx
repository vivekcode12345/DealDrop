import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { TrendingDown, Link2, History, Mail } from "lucide-react";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import {
  SITE_NAME,
  HERO_BADGE,
  HERO_TITLE,
  HERO_SUBTITLE,
  FEATURES,
  EMPTY_TITLE,
  EMPTY_TEXT,
} from "@/lib/content";

// Functional icons aligned with each feature panel.
const FEATURE_ICONS = [Link2, History, Mail];

// One shared container so the navbar, hero, products section and footer all
// share the same left/right edges at every breakpoint.
const CONTAINER =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

// Captured once per server render so every card shares the same "checked Xm
// ago" baseline and the client hydration matches the server HTML exactly.
// Kept in a helper so the timestamp is read at request time (not module load).
function readServerNow() {
  return Date.now();
}

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];
  // Single timestamp for the whole render, so every card shares the same
  // "checked Xm ago" baseline and the client render matches the server HTML.
  const serverNow = readServerNow();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#14171F]">
      {/* Header */}
      <header className="border-b border-[#E4E4E0] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className={`${CONTAINER} py-3 flex justify-between items-center gap-3`}>
          <Link
            href="/"
            aria-label="dealdrop — home"
            className="group flex items-center gap-1.5 min-w-0 shrink-0 rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9]"
          >
            <TrendingDown className="w-5 h-5 stroke-[2.25] text-[#B7791F] shrink-0" aria-hidden="true" />
            <span className="font-sans font-semibold text-base leading-5 tracking-tight text-[#14171F] truncate">
              dealdrop
            </span>
          </Link>

          <div className="shrink-0">
            <AuthButton user={user} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-14 md:py-20 border-b border-[#E4E4E0]">
          <div className={CONTAINER}>
            <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* Left-aligned Hero Content */}
              <div className="md:col-span-7 text-left">
                {HERO_BADGE && (
                  <div className="inline-flex items-center gap-2 border border-[#E4E4E0] bg-[#FFFFFF] text-[#6B7280] px-3 py-1 rounded-sm text-xs font-medium mb-5 shadow-xs">
                    {HERO_BADGE}
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#14171F] tracking-tight leading-[1.15] mb-4 text-balance">
                  {HERO_TITLE}
                </h1>
                <p className="text-base sm:text-lg text-[#6B7280] mb-8 max-w-2xl leading-relaxed">
                  {HERO_SUBTITLE}
                </p>

                <AddProductForm user={user} />
              </div>

              {/* Hero Visual: Static Price-Drop Sparkline */}
              <div className="md:col-span-5">
                <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm p-4 sm:p-5 relative overflow-hidden shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E0] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                      <span className="text-xs font-mono text-[#6B7280]">daily_monitor.active</span>
                    </div>
                    <span className="text-xs font-mono text-[#16A34A] bg-[#ECFDF3] px-2 py-0.5 rounded-sm border border-[#16A34A]/20 font-medium">
                      -18.4%
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="text-xs text-[#6B7280] mb-1">Previous recorded</div>
                      <div className="font-mono text-sm text-[#6B7280] line-through">$249.00</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[#6B7280] mb-1">Current price</div>
                      <div className="font-mono text-2xl font-bold text-[#B7791F]">
                        $203.18
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <svg
                      viewBox="0 0 340 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-24 stroke-[#B7791F]"
                      aria-label="Price drop trend illustration"
                    >
                      <defs>
                        <linearGradient id="dropGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#B7791F" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#B7791F" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="20" x2="340" y2="20" stroke="#E4E4E0" strokeDasharray="3 3" />
                      <line x1="0" y1="55" x2="340" y2="55" stroke="#E4E4E0" strokeDasharray="3 3" />
                      <line x1="0" y1="90" x2="340" y2="90" stroke="#E4E4E0" strokeDasharray="3 3" />
                      <path
                        d="M 10 24 L 75 28 L 140 46 L 205 38 L 270 72 L 330 86 L 330 98 L 10 98 Z"
                        fill="url(#dropGradient)"
                        stroke="none"
                      />
                      <path
                        d="M 10 24 L 75 28 L 140 46 L 205 38 L 270 72 L 330 86"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="24" r="3" fill="#FFFFFF" stroke="#B7791F" strokeWidth="2" />
                      <circle cx="75" cy="28" r="2.5" fill="#FFFFFF" stroke="#B7791F" strokeWidth="1.5" />
                      <circle cx="140" cy="46" r="2.5" fill="#FFFFFF" stroke="#B7791F" strokeWidth="1.5" />
                      <circle cx="205" cy="38" r="2.5" fill="#FFFFFF" stroke="#B7791F" strokeWidth="1.5" />
                      <circle cx="270" cy="72" r="2.5" fill="#FFFFFF" stroke="#B7791F" strokeWidth="1.5" />
                      <circle cx="330" cy="86" r="4" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>
                    <div className="flex justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[#6B7280] mt-2">
                      <span className="whitespace-nowrap">Day 1</span>
                      <span className="whitespace-nowrap">Day 7</span>
                      <span className="whitespace-nowrap">Day 14</span>
                      <span className="whitespace-nowrap">Day 21</span>
                      <span className="whitespace-nowrap">
                        Day 30
                        <span className="hidden lg:inline"> (Drop alert)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features: horizontal row of bordered hairline panels */}
            {products.length === 0 && (
              <div className="mt-12 pt-10 border-t border-[#E4E4E0]">
                <div className="grid md:grid-cols-3 gap-px bg-[#E4E4E0] border border-[#E4E4E0] rounded-sm overflow-hidden shadow-xs">
                  {FEATURES.map(({ title, description }, index) => {
                    const Icon = FEATURE_ICONS[index];
                    return (
                      <div
                        key={title}
                        className="bg-[#FFFFFF] p-6 flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-8 h-8 rounded-sm bg-[#FAFAF9] border border-[#E4E4E0] flex items-center justify-center mb-4">
                            {Icon && <Icon className="w-4 h-4 text-[#B7791F]" aria-hidden="true" />}
                          </div>
                          <h2 className="text-sm font-medium text-[#14171F] mb-1.5">
                            {title}
                          </h2>
                          <p className="text-xs text-[#6B7280] leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        {user && products.length > 0 && (
          <section className={`${CONTAINER} py-12 md:py-16`}>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E4E4E0]">
              <h2 className="text-lg font-medium text-[#14171F]">
                Your Tracked Products
              </h2>
              <span className="font-mono text-xs text-[#6B7280]">
                {products.length} {products.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} serverNow={serverNow} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {user && products.length === 0 && (
          <section className="mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
            <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm p-10 shadow-xs">
              <div className="w-10 h-10 rounded-sm bg-[#FAFAF9] border border-[#E4E4E0] flex items-center justify-center mx-auto mb-4">
                <Link2 className="w-5 h-5 text-[#6B7280]" />
              </div>
              <h2 className="text-base font-medium text-[#14171F] mb-2">
                {EMPTY_TITLE}
              </h2>
              <p className="text-xs text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                {EMPTY_TEXT}
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
