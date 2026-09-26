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
          className="gap-1.5 h-8 text-xs border-[#232937] bg-[#12161F] text-[#8B92A3] hover:text-[#F5F6F8] hover:bg-[#181E2A] rounded-md font-sans"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="default"
        size="sm"
        className="bg-[#E8A33D] hover:bg-[#d49231] text-[#0A0E14] font-medium h-8 text-xs px-3.5 gap-1.5 rounded-md"
      >
        <LogIn className="w-3.5 h-3.5" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}