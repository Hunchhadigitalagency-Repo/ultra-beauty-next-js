"use client";

import React from "react";
import useFetchData from "@/hooks/use-fetch";
import { IProduct } from "@/types/product";
import ProductSection from "../product/product-section";


const TrendingSection: React.FunctionComponent = () => {

  const { data: MostLovedProducts, loading, error } =
    useFetchData<IProduct[]>(`mostloved-product/`, true);

  return (

    <ProductSection
      isLoading={loading}
      error={error}
      products={MostLovedProducts || []}
      headerTitle="Loved By Everyone"
      headerDescription="Find the trending Products"
      headerLink="/shop"
    />
  );
};

export default TrendingSection;
