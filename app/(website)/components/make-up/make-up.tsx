"use client";
import React from "react";
import ProductSection from "../product/product-section";
import useFetchData from "@/hooks/use-fetch";
import { Result } from "@/types/product";

interface FeaturedProductResponse extends Result {
  id: number;
}

const MakeUp = () => {

  const { data, loading, error } =
    useFetchData<FeaturedProductResponse[]>(`featuredproduct/`);

  return (
    <ProductSection
      isLoading={loading}
      error={error}
      products={data}
      headerTitle="Make Up"
      headerDescription="Make yourself Up to fit the every  Occassion"
      headerLink="/shop"
    />
  );
};

export default MakeUp;
