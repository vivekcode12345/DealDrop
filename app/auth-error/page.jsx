import Link from "next/link";

export default function AuthError() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900">
        Sign-in failed. Please try again.
      </h1>
      <Link href="/" className="text-orange-500 hover:underline">
        Back to home
      </Link>
    </main>
  );
}
