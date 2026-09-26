import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import { TrendingDown, Link2, History, Mail } from "lucide-react";
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

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#14171F]">
      {/* Header */}
      <header className="border-b border-[#E4E4E0] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-sm bg-[#B7791F]/10 text-[#B7791F] border border-[#B7791F]/20">
              <TrendingDown className="w-4 h-4 stroke-[2.25]" />
            </span>
            <span className="font-sans font-semibold text-base tracking-tight text-[#14171F]">
              dealdrop
            </span>
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-14 md:py-20 px-4 border-b border-[#E4E4E0]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left-aligned Hero Content */}
            <div className="lg:col-span-7 text-left">
              {HERO_BADGE && (
                <div className="inline-flex items-center gap-2 border border-[#E4E4E0] bg-[#FFFFFF] text-[#6B7280] px-3 py-1 rounded-sm text-xs font-medium mb-5 shadow-xs">
                  {HERO_BADGE}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#14171F] tracking-tight leading-[1.15] mb-4">
                {HERO_TITLE}
              </h1>
              <p className="text-base sm:text-lg text-[#6B7280] mb-8 max-w-2xl leading-relaxed">
                {HERO_SUBTITLE}
              </p>

              <AddProductForm user={user} />
            </div>

            {/* Hero Visual: Static Price-Drop Sparkline */}
            <div className="lg:col-span-5">
              <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm p-5 relative overflow-hidden shadow-xs">
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
                    <div className="font-mono text-2xl font-bold text-[#B7791F]">$203.18</div>
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
                  <div className="flex justify-between font-mono text-[11px] text-[#6B7280] mt-2">
                    <span>Day 1</span>
                    <span>Day 7</span>
                    <span>Day 14</span>
                    <span>Day 21</span>
                    <span>Day 30 (Drop alert)</span>
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
                          {Icon && <Icon className="w-4 h-4 text-[#B7791F]" />}
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
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#E4E4E0]">
            <h2 className="text-lg font-medium text-[#14171F]">
              Your Tracked Products
            </h2>
            <span className="font-mono text-xs text-[#6B7280]">
              {products.length} {products.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-xl mx-auto px-4 py-16 text-center">
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
  );
}
