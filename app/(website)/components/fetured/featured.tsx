"use client";
import React from "react";
import ProductSection from "../product/product-section";
import useFetchData from "@/hooks/use-fetch";
import { Result } from "@/types/product";

interface FeaturedProductResponse extends Result {
  id: number;
}

const Featured = () => {
  const { data, loading, error } =
    useFetchData<FeaturedProductResponse[]>(`featuredproduct`);

  return (
    <ProductSection
      products={data}
      isLoading={loading}
      error={error}
      headerTitle="Featured Brand"
      headerDescription="Make yourself Up to fit the every  Occassion"
      headerLink="/shop"
    />
  );
};

export default Featured;
