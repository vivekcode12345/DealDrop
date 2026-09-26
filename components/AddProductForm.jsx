"use client";

import { useState } from "react";
import { addProduct } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { INPUT_PLACEHOLDER } from "@/lib/content";

export default function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("url", url);

    const result = await addProduct(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product tracked successfully!");
      setUrl("");
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={INPUT_PLACEHOLDER}
            className="h-10 text-sm bg-[#FFFFFF] border-[#E4E4E0] text-[#14171F] placeholder:text-[#6B7280] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md shadow-xs transition-colors"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-[#B7791F] hover:bg-[#9f6919] text-[#14171F] font-semibold h-10 px-5 rounded-md shrink-0 focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-2 focus-visible:border-[#B7791F] transition-colors shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#14171F]" />
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>
      </form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}