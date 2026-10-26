import {
  Link2,
  ScanSearch,
  CalendarClock,
  Mail,
  Target,
  RefreshCw,
  LineChart,
  Share2,
} from "lucide-react";
import {
  HOW_IT_WORKS_TITLE,
  HOW_IT_WORKS_SUBTITLE,
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_TOOLS_TITLE,
  HOW_IT_WORKS_TOOLS,
} from "@/lib/content";

// One shared container so the navbar, hero, how-it-works and footer all
// share the same left/right edges at every breakpoint.
const CONTAINER =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const STEP_ICONS = [Link2, ScanSearch, CalendarClock, Mail];
const TOOL_ICONS = [Target, RefreshCw, LineChart, Share2];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className={`${CONTAINER} py-12 md:py-16 scroll-mt-24 border-t border-[#E4E4E0] mt-12`}
    >
      <h2 id="how-it-works-heading" className="text-lg font-medium text-[#14171F] mb-2">
        {HOW_IT_WORKS_TITLE}
      </h2>
      <p className="text-sm text-[#6B7280] mb-10 md:mb-12 max-w-2xl">
        {HOW_IT_WORKS_SUBTITLE}
      </p>

      {/* Steps */}
      <ol
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch mb-12 md:mb-14"
      >
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index];
          const number = String(index + 1).padStart(2, "0");
          return (
            <li
              key={step.title}
              className="bg-[#FFFFFF] border border-[#E4E4E0] rounded-none p-5 sm:p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="w-10 h-10 shrink-0 rounded-none bg-[#F4F4F2] border border-[#E4E4E0] flex items-center justify-center">
                  {Icon && (
                    <Icon className="w-5 h-5 text-[#B7791F]" aria-hidden="true" />
                  )}
                </div>
                <span className="font-mono text-xs text-[#6B7280]">{number}</span>
              </div>
              <h3 className="text-base font-semibold text-[#14171F]">
                {step.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {step.description}
              </p>
              <span
                className="mt-auto font-mono text-xs text-[#6B7280] border border-[#E4E4E0] px-2 py-1 rounded-none"
              >
                {step.note}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Tools */}
      <div>
        <h3 className="text-base font-medium text-[#14171F] mb-4 md:mb-6">
          {HOW_IT_WORKS_TOOLS_TITLE}
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_IT_WORKS_TOOLS.map((tool, index) => {
            const Icon = TOOL_ICONS[index];
            return (
              <li
                key={tool.title}
                className="bg-[#FFFFFF] border border-[#E4E4E0] rounded-none p-4 sm:p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  {Icon && (
                    <Icon className="w-4 h-4 text-[#B7791F]" aria-hidden="true" />
                  )}
                </div>
                <h4 className="text-sm font-semibold text-[#14171F]">
                  {tool.title}
                </h4>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {tool.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
