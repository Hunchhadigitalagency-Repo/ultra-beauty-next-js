"use client";
import React from 'react';
import ProductSection from '../product/product-section';
import useFetchData from "@/hooks/use-fetch";
import { Result } from "@/types/product";

interface FeaturedProductResponse extends Result {
  id: number;
}

const SkinCare = () => {
      const { data, loading, error } =
    useFetchData<FeaturedProductResponse[]>(`featuredproduct`);
    return (
        <ProductSection
            isLoading={loading}
            error={error}
            products={data}
            headerTitle='Skin Care'
            headerDescription='Care your skin like never before'
            headerLink='/shop'
        />
    )
}

export default SkinCare