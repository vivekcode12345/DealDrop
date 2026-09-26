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
    <div className="border border-[#E4E4E0] bg-[#FFFFFF] rounded-sm transition-colors shadow-xs flex flex-col justify-between">
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="flex gap-4 items-start">
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-sm border border-[#E4E4E0] bg-[#FAFAF9] shrink-0"
            />
          )}

          <div className="flex-1 min-w-0">
            <h3
              title={product.name}
              className="font-medium text-sm text-[#14171F] line-clamp-2 h-10 mb-2 leading-snug cursor-default"
            >
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="font-mono text-2xl font-bold text-[#B7791F] tabular-nums">
                {product.currency} {product.current_price}
              </span>
              <span className="inline-flex items-center text-[11px] font-mono text-[#6B7280] border border-[#E4E4E0] bg-[#FAFAF9] px-2 py-0.5 rounded-sm">
                Monitored
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-[#E4E4E0]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChart(!showChart)}
            className="h-7 text-xs gap-1 border-[#E4E4E0] bg-[#FAFAF9] text-[#14171F] hover:bg-[#F4F4F2] hover:border-[#D1D1CB] hover:text-[#14171F] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md font-sans transition-colors"
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
            className="h-7 text-xs gap-1 border-[#E4E4E0] bg-[#FAFAF9] text-[#14171F] hover:bg-[#F4F4F2] hover:border-[#D1D1CB] hover:text-[#14171F] focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 focus-visible:border-[#B7791F] rounded-md font-sans transition-colors"
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
            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-[#B7791F] focus-visible:ring-offset-1 gap-1 ml-auto rounded-md font-sans transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remove
          </Button>
        </div>
      </div>

      {showChart && (
        <div className="border-t border-[#E4E4E0] bg-[#FAFAF9]/60 p-4 sm:p-5">
          <PriceChart productId={product.id} />
        </div>
      )}
    </div>
  );
}
