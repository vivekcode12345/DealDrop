"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, serverNow }) {
  const [openChartId, setOpenChartId] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          serverNow={serverNow}
          isOpen={openChartId === product.id}
          onToggle={() =>
            setOpenChartId(openChartId === product.id ? null : product.id)
          }
        />
      ))}
    </div>
  );
}
