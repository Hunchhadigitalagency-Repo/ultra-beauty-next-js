"use client";

import React from "react";
import useFetchData from "@/hooks/use-fetch";
import { ProductResponse } from "@/types/product";
import ProductSection from "../product/product-section";


const TrendingSection: React.FunctionComponent = () => {

  const { data: MostLovedProducts, loading, error } =
    useFetchData<ProductResponse>(`mostloved-product/`, true);

  return (

    <ProductSection
      isLoading={loading}
      error={error}
      products={MostLovedProducts?.results || []}
      headerTitle="Loved By EveryOne"
      headerDescription="Find the trending Products"
      headerLink="/shop"
    />
  );
};

export default TrendingSection;
