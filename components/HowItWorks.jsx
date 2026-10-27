import {
  CalendarClock,
  ImageIcon,
  LineChart,
  Link2,
  Mail,
  RefreshCw,
  ScanSearch,
  Share2,
  Target,
} from "lucide-react";
import {
  HOW_IT_WORKS_TITLE,
  HOW_IT_WORKS_SUBTITLE,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_TOOLS_TITLE,
  HOW_IT_WORKS_TOOLS,
} from "@/lib/content";

const CONTAINER =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const STEP_ICONS = [Link2, ScanSearch, CalendarClock, Mail];
const TOOL_ICONS = [Target, RefreshCw, LineChart, Share2];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 py-12 md:py-20"
    >
      <div className={CONTAINER}>
        {/* Header */}
        <header className="border-b border-[#E4E4E0] pb-8 mb-14 md:mb-20">
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-5xl font-semibold tracking-tight text-balance text-[#14171F] leading-tight"
          >
            {HOW_IT_WORKS_TITLE}
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-[#6B7280]">
            {HOW_IT_WORKS_SUBTITLE}
          </p>
        </header>
        {/* Main Grid: Steps timeline | Sample preview */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">

          {/* Left: Steps timeline */}
          <ol className="min-w-0 lg:col-span-6 relative">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index];
              const number = String(index + 1).padStart(2, "0");
              const isLast = index === HOW_IT_WORKS_STEPS.length - 1;
              return (
                <li
                  key={step.title}
                  className="relative pb-16 pl-16 last:pb-0"
                >
                  {/* Vertical connector rail */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-[56px] bottom-4 w-[1px] bg-[#E4E4E0] last:hidden"
                  />
                  {/* Step node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E4E0] bg-white font-mono text-xs font-medium text-[#8A5A12] shadow-sm z-10"
                  >
                    {number}
                  </span>
                  <div className="pl-1 pt-1">
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className="h-5 w-5 shrink-0 text-[#B7791F]"
                        aria-hidden="true"
                      />
                      <h3 className="text-base font-semibold text-[#14171F]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-[38rem] text-sm leading-relaxed text-[#6B7280]">
                      {step.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E4E4E0] bg-white px-3 py-1 font-mono text-xs text-[#6B7280] shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B7791F]" />
                      {step.note}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Right: Sample preview panel */}
          <div className="min-w-0 lg:col-span-6">
            <div className="border border-[#E4E4E0] bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-[#E4E4E0] px-5 py-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#6B7280]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                  sample.preview
                </span>
                <span className="font-mono text-xs text-[#6B7280]">Sample data</span>
              </div>
              <div className="space-y-5 p-5 sm:p-6">
                {/* Product card */}
                <div className="border border-[#E4E4E0] bg-white p-4 sm:p-5">
                  <div className="flex gap-4 sm:gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-[#FAFAF9] border border-[#E4E4E0] rounded-none">
                      <ImageIcon className="h-6 w-6 text-[#9CA3AF]" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-[#14171F] truncate sm:text-base">
                        Sample product name
                      </span>
                      <div className="mt-2 sm:mt-2.5 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xl font-semibold text-[#B7791F] sm:text-2xl">
                          ₹1,139
                        </span>
                        <span className="inline-flex items-center border border-[#E8D9B8] bg-[#FBF5E8] px-2 sm:px-2.5 py-0.5 font-mono text-[11px] text-[#8A5A12]">
                          Target: ₹1,000
                        </span>
                      </div>
                      <div className="mt-3 sm:mt-4 flex items-center gap-1.5 text-xs text-[#6B7280]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                        <span>Tracking daily</span>
                      </div>
                      <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 border-t border-[#E4E4E0] pt-3 sm:pt-4">
                        <span className="cursor-not-allowed px-3 sm:px-3.5 py-1.5 text-xs font-medium border border-[#E4E4E0] text-[#14171F]">
                          Check Now
                        </span>
                        <span className="cursor-not-allowed px-3 sm:px-3.5 py-1.5 text-xs font-medium border border-[#E4E4E0] text-[#14171F]">
                          Price History
                        </span>
                        <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center border border-[#E4E4E0]">
                          <Share2 className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email alert */}
                <div className="border border-[#E4E4E0] bg-[#FAFAF9] p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="h-4 w-4 shrink-0 text-[#B7791F]" aria-hidden="true" />
                      <span className="truncate text-sm font-medium text-[#14171F] sm:text-base">
                        Target price reached
                      </span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[#6B7280] shrink-0">09:00 IST</span>
                  </div>
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-sm text-[#6B7280] line-through">₹1,249</span>
                    <span className="font-mono text-base font-semibold text-[#14171F] sm:text-lg">₹1,139</span>
                    <span className="inline-flex items-center border border-[#BBF7D0] bg-[#ECFDF3] px-2 sm:px-2.5 py-0.5 font-mono text-xs text-[#15803D]">
                      -9%
                    </span>
                  </div>
                </div>

                {/* Price trend */}
                <div className="border border-[#E4E4E0] bg-white p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm font-medium text-[#6B7280]">
                      Recorded Price Trend
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#6B7280]">3 checks</span>
                  </div>
                  <div className="mt-4 sm:mt-5 flex items-stretch gap-3">
                    <div className="flex flex-col justify-between py-0.5 font-mono text-[11px] sm:text-xs text-[#6B7280]">
                      <span>₹1,299</span>
                      <span>₹1,139</span>
                    </div>
                    <svg
                      viewBox="0 0 300 80"
                      preserveAspectRatio="none"
                      className="h-20 min-w-0 flex-1"
                      aria-hidden="true"
                      fill="none"
                    >
                      <line x1="0" y1="10" x2="300" y2="10" stroke="#E4E4E0" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="40" x2="300" y2="40" stroke="#E4E4E0" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="70" x2="300" y2="70" stroke="#E4E4E0" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                      <polygon points="0,10 150,29 300,70 300,80 0,80" fill="#B7791F" fillOpacity="0.08" />
                      <polyline points="0,10 150,29 300,70" fill="none" stroke="#B7791F" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>
                  <div className="mt-2 sm:mt-3 flex justify-between pl-[52px] font-mono text-[11px] sm:text-xs text-[#6B7280]">
                    <span>Oct 1</span>
                    <span>Oct 7</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Tools */}
        <div className="mt-16 md:mt-20">
          <h3 className="text-2xl font-semibold tracking-tight text-[#14171F]">
            {HOW_IT_WORKS_TOOLS_TITLE}
          </h3>
          <ul className="mt-6 md:mt-8 grid gap-px border border-[#E4E4E0] bg-[#E4E4E0] sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_TOOLS.map((tool, index) => {
              const Icon = TOOL_ICONS[index];
              return (
                <li key={tool.title} className="bg-white p-5 sm:p-6">
                  <span aria-hidden="true" className="grid h-10 w-10 place-items-center border border-[#E4E4E0] bg-[#FAFAF9] text-[#B7791F]">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </span>
                  <h4 className="mt-5 text-base font-semibold text-[#14171F]">
                    {tool.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                    {tool.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </section>
  );
}
