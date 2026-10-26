import {
  CalendarClock,
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
      className={`${CONTAINER} py-12 md:py-16 scroll-mt-24 mt-12`}
    >
      <div className="border-b border-[#E4E4E0] pb-8 mb-12 md:mb-14">
        <h2
          id="how-it-works-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-balance text-[#14171F]"
        >
          {HOW_IT_WORKS_TITLE}
        </h2>
        <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mt-4">
          {HOW_IT_WORKS_SUBTITLE}
        </p>
      </div>

      <div
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start mb-12 md:mb-14"
      >
        <div
          className="hidden lg:block lg:absolute lg:top-[28px] lg:left-[12.5%] lg:w-[25%] lg:h-[1px] lg:bg-[#E4E4E0] lg:-z-10"
        />
        <div
          className="hidden lg:block lg:absolute lg:top-[28px] lg:left-[37.5%] lg:w-[25%] lg:h-[1px] lg:bg-[#E4E4E0] lg:-z-10"
        />
        <div
          className="hidden lg:block lg:absolute lg:top-[28px] lg:left-[62.5%] lg:w-[25%] lg:h-[1px] lg:bg-[#E4E4E0] lg:-z-10"
        />

        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index];
          const number = String(index + 1).padStart(2, "0");
          return (
            <li
              key={step.title}
              className="relative bg-[#FFFFFF] border border-[#E4E4E0] rounded-none p-5 sm:p-6 flex flex-col gap-4 min-w-0"
            >
              <div
                className="w-8 h-8 rounded-full border border-[#E4E4E0] bg-[#FFFFFF] flex items-center justify-center font-mono text-[12px] text-[#8A5A12] shrink-0 z-10 absolute top-5 left-5 lg:top-[-32px] lg:left-1/2 lg:-translate-x-1/2"
              >
                {number}
              </div>

              <div
                className="h-24 sm:h-28 bg-[#FAFAF9] border border-[#E4E4E0] rounded-none p-3 overflow-hidden shrink-0 flex flex-col gap-2"
                aria-hidden="true"
              >
                {index === 0 && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-mono text-[10px] text-[#6B7280] truncate"
                        title="https://shop.example/p/abc123"
                      >
                        https://shop.example/p/…
                      </span>
                      <button
                        className="text-[10px] font-medium text-[#8A5A12] bg-[#F4F4F2] border border-[#E4E4E0] px-2 py-1 rounded-none shrink-0"
                        disabled
                        aria-hidden="true"
                      >
                        Track
                      </button>
                    </div>
                    <div
                      className="font-mono text-[10px] text-[#6B7280] border border-[#E4E4E0] px-1.5 py-0.5 rounded-none w-fit"
                    >
                      Target ₹1,000
                    </div>
                  </>
                )}
                {index === 1 && (
                  <div className="flex items-start gap-2 min-w-0">
                    <div className="w-8 h-8 shrink-0 bg-[#F4F4F2] border border-[#E4E4E0] rounded-none" />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="text-xs text-[#14171F] truncate leading-none"
                        title="Sample product name"
                      >
                        Sample product
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-xs font-semibold text-[#14171F]">
                          ₹1,139
                        </span>
                        <span className="text-[10px] text-[#6B7280]">INR</span>
                      </div>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                      <div
                        key={day}
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          day === 6 ? "bg-[#B7791F]" : "bg-[#E4E4E0]"
                        }`}
                      />
                    ))}
                    <span className="font-mono text-xs text-[#6B7280]">
                      09:00 IST
                    </span>
                  </div>
                )}
                {index === 3 && (
                  <div className="flex items-start gap-2 min-w-0">
                    <Mail
                      className="w-3 h-3 shrink-0 text-[#B7791F]"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span
                        className="text-xs text-[#14171F] truncate leading-none"
                        title="Price drop on Sample product"
                      >
                        Price drop on Sample product
                      </span>
                      <span
                        className="font-mono text-[10px] text-[#16A34A] bg-[#F0FDF4] border border-[#16A34A]/20 px-1.5 py-0.5 rounded-none"
                      >
                        -12%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-base font-semibold text-[#14171F]">
                {step.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {step.description}
              </p>
              <span
                className="mt-auto inline-flex w-fit items-center gap-1.5 font-mono text-xs text-[#6B7280] border border-[#E4E4E0] px-2 py-1 rounded-none"
              >
                <span
                  className="w-1.5 h-1.5 bg-[#B7791F] rounded-full shrink-0"
                  aria-hidden="true"
                />
                {step.note}
              </span>
            </li>
          );
        })}
      </div>

      <div>
        <h3 className="text-base font-medium text-[#14171F] mb-4 md:mb-6">
          {HOW_IT_WORKS_TOOLS_TITLE}
        </h3>
        <ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
        >
          {HOW_IT_WORKS_TOOLS.map((tool, index) => {
            const Icon = TOOL_ICONS[index];
            const isPriceHistory = index === 2;
            const isTargetPrice = index === 0;
            const isCheckNow = index === 1;
            const isShareable = index === 3;

            return (
              <li
                key={tool.title}
                className={`bg-[#FFFFFF] border border-[#E4E4E0] rounded-none p-4 sm:p-5 flex flex-col gap-3 min-w-0 ${
                  isPriceHistory
                    ? "lg:col-span-6 lg:row-span-2"
                    : isTargetPrice
                    ? "lg:col-span-6"
                    : "lg:col-span-3"
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && (
                    <Icon
                      className="w-4 h-4 text-[#B7791F]"
                      aria-hidden="true"
                    />
                  )}
                  <h4 className="text-base font-semibold text-[#14171F]">
                    {tool.title}
                  </h4>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {tool.description}
                </p>

                {isPriceHistory && (
                  <div className="mt-auto">
                    <svg
                      width="100%"
                      height="56"
                      viewBox="0 0 100 56"
                      fill="none"
                      aria-hidden="true"
                    >
                      <line
                        x1="10"
                        y1="14"
                        x2="90"
                        y2="14"
                        stroke="#E4E4E0"
                        strokeDasharray="3,3"
                        strokeWidth="1"
                      />
                      <line
                        x1="10"
                        y1="28"
                        x2="90"
                        y2="28"
                        stroke="#E4E4E0"
                        strokeDasharray="3,3"
                        strokeWidth="1"
                      />
                      <line
                        x1="10"
                        y1="42"
                        x2="90"
                        y2="42"
                        stroke="#E4E4E0"
                        strokeDasharray="3,3"
                        strokeWidth="1"
                      />
                      <polyline
                        points="10,42 25,34 40,38 55,28 70,22 85,18 90,14"
                        stroke="#B7791F"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="90" cy="14" r="2" fill="#16A34A" />
                      <text
                        x="8"
                        y="12"
                        fontFamily="monospace"
                        fontSize="10"
                        fill="#6B7280"
                      >
                        ₹1,299
                      </text>
                      <text
                        x="8"
                        y="44"
                        fontFamily="monospace"
                        fontSize="10"
                        fill="#6B7280"
                      >
                        ₹1,139
                      </text>
                      <text
                        x="10"
                        y="54"
                        fontFamily="monospace"
                        fontSize="10"
                        fill="#6B7280"
                      >
                        Oct 1
                      </text>
                      <text
                        x="90"
                        y="54"
                        fontFamily="monospace"
                        fontSize="10"
                        fill="#6B7280"
                        textAnchor="end"
                      >
                        Oct 7
                      </text>
                    </svg>
                  </div>
                )}

                {isTargetPrice && (
                  <div className="mt-auto flex items-center gap-2">
                    <span className="font-mono text-xs text-[#6B7280]">
                      Now ₹1,139
                    </span>
                    <div className="flex-1 h-[1px] bg-[#E4E4E0]" />
                    <span className="font-mono text-xs text-[#6B7280]">
                      Target ₹1,000
                    </span>
                    <span className="font-mono text-[10px] text-[#8A5A12]">
                      ₹139 gap
                    </span>
                  </div>
                )}

                {isCheckNow && (
                  <div className="mt-auto flex items-center justify-between">
                    <button
                      className="flex items-center gap-1.5 text-[10px] font-medium text-[#14171F] bg-[#FFFFFF] border border-[#E4E4E0] px-2.5 py-1.5 rounded-none shrink-0"
                      disabled
                      aria-hidden="true"
                    >
                      <RefreshCw className="w-3 h-3" aria-hidden="true" />
                      Check Now
                    </button>
                    <span className="font-mono text-xs text-[#6B7280]">
                      Checked 2m ago
                    </span>
                  </div>
                )}

                {isShareable && (
                  <div className="mt-auto flex items-center gap-2">
                    <span
                      className="font-mono text-xs text-[#6B7280] truncate bg-[#FAFAF9] border border-[#E4E4E0] px-2 py-1 rounded-none"
                      title="deal-drop-x.vercel.app/share/3f44a1"
                    >
                      deal-drop-x.vercel.app/share/3f44…
                    </span>
                    <Share2
                      className="w-3 h-3 shrink-0 text-[#B7791F]"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}