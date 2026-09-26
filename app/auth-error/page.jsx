import Link from "next/link";

export default function AuthError() {
  return (
    <main className="min-h-screen bg-[#FAFAF9] text-[#14171F] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm p-8 max-w-sm w-full shadow-xs">
        <h1 className="text-lg font-semibold text-[#14171F] mb-2">
          Sign-in failed. Please try again.
        </h1>
        <p className="text-xs text-[#6B7280] mb-6">
          Authentication with your provider could not be completed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full h-9 rounded-md bg-[#B7791F] hover:bg-[#9f6919] text-[#14171F] font-semibold text-xs focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-2 focus-visible:outline-none transition-colors shadow-xs"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}


