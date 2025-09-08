'use client'
import React from 'react';
import ProductSection from '../product/product-section';
import useFetchData from '@/hooks/use-fetch';
import { Result } from '@/types/product';


interface ProductResponse extends Result {
  id: number
}


const Featured = () => {
  const { data, loading, error } = useFetchData<ProductResponse[]>(`featuredproduct/`);

  return (
    <ProductSection
      products={data}
      isLoading={loading}
      error={error}
      headerTitle='Featured Products'
      headerDescription='Find the deals that are limited in offers'
      headerLink='/shop'
      buttonText='All Sales'
    />
  )
}

export default Featured