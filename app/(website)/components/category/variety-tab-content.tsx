"use client";

import React from "react";
import { IProduct } from "@/types/product";
import { ScribbleProductCard } from "@/components/ui/product-scribble";
import { useInfiniteFetchNoToken } from "@/hooks/use-infinite-fetch-no-token";
import ProductVarietyCard from "@/components/common/cards/product-variety-card";

interface VarietyTabContentProps {
  categoryId: number;
}

const VarietyTabContent: React.FC<VarietyTabContentProps> = ({ categoryId }) => {

  const { data: products, loading } = useInfiniteFetchNoToken<IProduct>(
    `/products/?category=${categoryId}`,
    3
  );
  if (loading) {
    return (
      <div className="flex flex-nowrap overflow-x-auto gap-6 scrollbar-hide">
        {[1, 2, 3].map((index) => (
          <ScribbleProductCard key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <p className="text-sm text-muted-foreground">No products found.</p>;
  }

  return (
    <div className="flex flex-nowrap overflow-x-auto gap-6 scrollbar-hide">
      {products.map((product) => (
        <ProductVarietyCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default VarietyTabContent;
