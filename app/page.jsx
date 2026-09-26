import { createClient } from "@/utils/supabase/server";
import { getProducts } from "./actions";
import AddProductForm from "@/components/AddProductForm";
import ProductCard from "@/components/ProductCard";
import { TrendingDown, Link2, History, Mail } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import Image from "next/image";
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
    <main className="min-h-screen bg-[#0A0E14] text-[#F5F6F8]">
      {/* Header */}
      <header className="border-b border-[#232937] bg-[#0A0E14]/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/deal-drop-logo.png"
              alt={`${SITE_NAME} logo`}
              width={600}
              height={200}
              className="h-8 w-auto brightness-110"
              priority
            />
          </div>

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-14 md:py-20 px-4 border-b border-[#232937]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left-aligned Hero Content */}
            <div className="lg:col-span-7 text-left">
              {HERO_BADGE && (
                <div className="inline-flex items-center gap-2 border border-[#232937] bg-[#12161F] text-[#8B92A3] px-3 py-1 rounded-sm text-xs font-medium mb-5">
                  {HERO_BADGE}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F6F8] tracking-tight leading-[1.15] mb-4">
                {HERO_TITLE}
              </h1>
              <p className="text-base sm:text-lg text-[#8B92A3] mb-8 max-w-2xl leading-relaxed">
                {HERO_SUBTITLE}
              </p>

              <AddProductForm user={user} />
            </div>

            {/* Hero Visual: Static Price-Drop Sparkline */}
            <div className="lg:col-span-5">
              <div className="border border-[#232937] bg-[#12161F] rounded-sm p-5 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#232937] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <span className="text-xs font-mono text-[#8B92A3]">daily_monitor.active</span>
                  </div>
                  <span className="text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-sm border border-[#22C55E]/20">
                    -18.4%
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-xs text-[#8B92A3] mb-1">Previous recorded</div>
                    <div className="font-mono text-sm text-[#8B92A3] line-through">$249.00</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[#8B92A3] mb-1">Current price</div>
                    <div className="font-mono text-2xl font-bold text-[#E8A33D]">$203.18</div>
                  </div>
                </div>

                <div className="pt-2">
                  <svg
                    viewBox="0 0 340 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-24 stroke-[#E8A33D]"
                    aria-label="Price drop trend illustration"
                  >
                    <defs>
                      <linearGradient id="dropGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E8A33D" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#E8A33D" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="340" y2="20" stroke="#232937" strokeDasharray="3 3" />
                    <line x1="0" y1="55" x2="340" y2="55" stroke="#232937" strokeDasharray="3 3" />
                    <line x1="0" y1="90" x2="340" y2="90" stroke="#232937" strokeDasharray="3 3" />
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
                    <circle cx="10" cy="24" r="3" fill="#12161F" stroke="#E8A33D" strokeWidth="2" />
                    <circle cx="75" cy="28" r="2.5" fill="#12161F" stroke="#E8A33D" strokeWidth="1.5" />
                    <circle cx="140" cy="46" r="2.5" fill="#12161F" stroke="#E8A33D" strokeWidth="1.5" />
                    <circle cx="205" cy="38" r="2.5" fill="#12161F" stroke="#E8A33D" strokeWidth="1.5" />
                    <circle cx="270" cy="72" r="2.5" fill="#12161F" stroke="#E8A33D" strokeWidth="1.5" />
                    <circle cx="330" cy="86" r="4" fill="#22C55E" stroke="#12161F" strokeWidth="2" />
                  </svg>
                  <div className="flex justify-between font-mono text-[11px] text-[#8B92A3] mt-2">
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
            <div className="mt-12 pt-10 border-t border-[#232937]">
              <div className="grid md:grid-cols-3 gap-px bg-[#232937] border border-[#232937] rounded-sm overflow-hidden">
                {FEATURES.map(({ title, description }, index) => {
                  const Icon = FEATURE_ICONS[index];
                  return (
                    <div
                      key={title}
                      className="bg-[#12161F] p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-sm bg-[#181E2A] border border-[#232937] flex items-center justify-center mb-4">
                          {Icon && <Icon className="w-4 h-4 text-[#E8A33D]" />}
                        </div>
                        <h2 className="text-sm font-medium text-[#F5F6F8] mb-1.5">
                          {title}
                        </h2>
                        <p className="text-xs text-[#8B92A3] leading-relaxed">
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
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#232937]">
            <h2 className="text-lg font-medium text-[#F5F6F8]">
              Your Tracked Products
            </h2>
            <span className="font-mono text-xs text-[#8B92A3]">
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
          <div className="border border-[#232937] bg-[#12161F] rounded-sm p-10">
            <div className="w-10 h-10 rounded-sm bg-[#181E2A] border border-[#232937] flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-5 h-5 text-[#8B92A3]" />
            </div>
            <h2 className="text-base font-medium text-[#F5F6F8] mb-2">
              {EMPTY_TITLE}
            </h2>
            <p className="text-xs text-[#8B92A3] leading-relaxed max-w-sm mx-auto">
              {EMPTY_TEXT}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
