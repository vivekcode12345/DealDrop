import { TrendingDown } from "lucide-react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/content";

// lucide-react no longer ships brand icons, so the GitHub mark is inlined.
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

export default function Footer() {
  return (
    <footer className="border-t border-[#E4E4E0] bg-[#FFFFFF] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 min-w-0">
            <span className="flex items-center justify-center w-6 h-6 rounded-sm bg-[#B7791F]/10 text-[#B7791F] border border-[#B7791F]/20 shrink-0">
              <TrendingDown className="w-3.5 h-3.5 stroke-[2.25]" />
            </span>
            <span className="font-sans font-semibold text-sm tracking-tight text-[#14171F]">
              dealdrop
            </span>
            <span className="text-xs text-[#6B7280]">
              — Automated product price tracker
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2 text-xs text-[#6B7280] shrink-0">
            <span>
              Built by{" "}
              <Link
                href="https://github.com/vivekcode12345"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#14171F] font-medium hover:text-[#B7791F] transition-colors underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:outline-none rounded-sm"
              >
                Vivek Verma
              </Link>
            </span>

            <span className="inline-block w-1 h-1 rounded-full bg-[#E4E4E0]" />

            <Link
              href="https://github.com/vivekcode12345/DealDrop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#14171F] transition-colors focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:outline-none rounded-sm"
              aria-label="GitHub Repository"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#E4E4E0]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6B7280] text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-[10px]">
            Daily automated checks via pg_cron &amp; Resend
          </p>
        </div>
      </div>
    </footer>
  );
}
