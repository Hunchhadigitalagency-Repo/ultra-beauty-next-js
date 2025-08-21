"use client";
import React from "react";
import ProductSection from "../product/product-section";
import useFetchData from "@/hooks/use-fetch";
import { Result } from "@/types/product";

interface FeaturedProductResponse extends Result {
  id: number;
}
const TrendingSection: React.FunctionComponent = () => {
  const { data, loading, error } =
    useFetchData<FeaturedProductResponse[]>(`featuredproduct`);
  return (
    <ProductSection
      isLoading={loading}
      error={error}
      products={data}
      headerTitle="Loved By EveryOne"
      headerDescription="Find the trending Products"
      headerLink="/shop"
    />
  );
};

export default TrendingSection;
