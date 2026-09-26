import Link from "next/link";

export default function AuthError() {
  return (
    <main className="min-h-screen bg-[#0A0E14] text-[#F5F6F8] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="border border-[#232937] bg-[#12161F] rounded-sm p-8 max-w-sm w-full">
        <h1 className="text-lg font-semibold text-[#F5F6F8] mb-2">
          Sign-in failed. Please try again.
        </h1>
        <p className="text-xs text-[#8B92A3] mb-6">
          Authentication with your provider could not be completed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-full h-9 rounded-md bg-[#E8A33D] hover:bg-[#d49231] text-[#0A0E14] font-medium text-xs transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

