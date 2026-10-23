import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Link2, History, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

// Reuse the exact same inline GitHub mark the footer uses.
function GitHubIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.19.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

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
        <div className={`${CONTAINER} py-3 flex items-center justify-between gap-3`}>
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <Link
              href="/"
              aria-label="dealdrop — home"
              className="group flex items-center gap-1.5 min-w-0 shrink-0 rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF9]"
            >
              <Image
                src="/logo.png"
                width={1219}
                height={864}
                priority
                alt="dealdrop"
                className="h-8 w-auto shrink-0 object-contain"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-8">
              <a
                href="#how-it-works"
                className="text-sm text-[#6B7280] hover:text-[#14171F] transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7791F]"
              >
                How it works
              </a>
              {user && (
                <a
                  href="#tracked-products"
                  className="text-sm text-[#6B7280] hover:text-[#14171F] transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7791F]"
                >
                  My products
                </a>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="https://github.com/vivekcode12345/DealDrop"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              title="View source on GitHub"
              className="w-8 h-8 shrink-0 border border-[#E4E4E0] bg-[#FFFFFF] flex items-center justify-center rounded-md hover:bg-[#F4F4F2] hover:border-[#D1D1CB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] transition-colors duration-150"
            >
              <GitHubIcon className="w-4 h-4 text-[#6B7280]" aria-hidden="true" />
            </Link>
            <div className="shrink-0">
              <AuthButton user={user} />
            </div>
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
              <div id="how-it-works" className="mt-12 pt-10 border-t border-[#E4E4E0] scroll-mt-20">
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
          <section id="tracked-products" className={`${CONTAINER} py-12 md:py-16 scroll-mt-20`}>
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
