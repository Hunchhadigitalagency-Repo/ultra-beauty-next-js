"use client";
import React from "react";
import ProductSection from "../product/product-section";
import FeaturedProducts from "../featured-products/featured-products-section";
import useFetchData from "@/hooks/use-fetch";
import ProductType from "../product/product-section";
import { Result } from "@/types/product";

interface FeaturedProductResponse extends Result {
  id: number;
}

const Featured = () => {
  const { data, isLoading, error } =
    useFetchData<FeaturedProductResponse[]>(`featuredproduct`);

  return (
    <ProductSection
      products={data}
      isLoading={isLoading}
      error={error}
      headerTitle="Featured Brand"
      headerDescription="Make yourself Up to fit the every  Occassion"
      headerLink="/shop"
    />
  );
};

export default Featured;
