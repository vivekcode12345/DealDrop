"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/actions";
import PriceChart from "./PriceChart";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductCard({ product }) {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Remove this product from tracking?")) return;

    setDeleting(true);
    const result = await deleteProduct(product.id);

    if (result.error) {
      toast.error(result.error);
      setDeleting(false);
    } else {
      toast.success("Product removed");
    }
  };

  return (
    <div className="border border-[#232937] bg-[#12161F] rounded-sm transition-colors">
      <div className="p-4 sm:p-5">
        <div className="flex gap-4">
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-sm border border-[#232937] bg-[#181E2A] shrink-0"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm text-[#F5F6F8] line-clamp-2 mb-2 leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="font-mono text-2xl font-bold text-[#E8A33D] tabular-nums">
                {product.currency} {product.current_price}
              </span>
              <span className="inline-flex items-center text-[11px] font-mono text-[#8B92A3] border border-[#232937] bg-[#181E2A] px-2 py-0.5 rounded-sm">
                Monitored
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#232937]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="h-7 text-xs gap-1 border-[#232937] bg-[#181E2A] text-[#F5F6F8] hover:bg-[#232937] hover:text-[#F5F6F8] rounded-md font-sans"
          >
            {showChart ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Price History
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1 border-[#232937] bg-[#181E2A] text-[#F5F6F8] hover:bg-[#232937] hover:text-[#F5F6F8] rounded-md font-sans"
            nativeButton={false}
            render={<Link href={product.url} target="_blank" rel="noopener noreferrer" />}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Product
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1 ml-auto rounded-md font-sans"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </Button>
        </div>
      </div>

      {showChart && (
        <div className="border-t border-[#232937] bg-[#0A0E14]/40 p-4 sm:p-5">
          <PriceChart productId={product.id} />
        </div>
      )}
    </div>
  );
}
