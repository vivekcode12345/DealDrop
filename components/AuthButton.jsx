"use client";

import { useState } from "react";
import { signOut } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton({ user }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={signOut}>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          className="gap-1.5 h-8 text-xs border-[#E4E4E0] bg-[#FFFFFF] text-[#14171F] hover:bg-[#F4F4F2] hover:text-[#14171F] rounded-md font-sans shadow-xs transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-[#6B7280]" />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="outline"
        size="sm"
        className="gap-1.5 h-8 text-xs border-[#E4E4E0] bg-[#FFFFFF] text-[#14171F] hover:bg-[#F4F4F2] hover:text-[#14171F] px-3.5 rounded-md font-sans font-medium shadow-xs transition-colors"
      >
        <LogIn className="w-3.5 h-3.5 text-[#B7791F]" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}