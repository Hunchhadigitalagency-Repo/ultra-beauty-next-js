"use client";
import React from "react";
import { Result } from "@/types/product";
import useFetchData from "@/hooks/use-fetch";
import ProductSection from "../product/product-section";

interface FeaturedProductResponse extends Result {
  id: number;
}
const TrendingSection: React.FunctionComponent = () => {

  const { data, loading, error } =
    useFetchData<FeaturedProductResponse[]>(`featuredproduct`, true);

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
