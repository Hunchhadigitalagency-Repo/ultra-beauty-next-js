"use client"

import React from 'react';
import Review from './components/review';
import SingleProductSection from './components/single-product-section';
import DetailDecription from './components/detail-description-section';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch';
import { SingleProductResponse } from '@/types/product';

const SingleProductPage: React.FunctionComponent = () => {

  const params = useParams();
  const slug = params?.slug as string;

  const { data } = useFetchData<SingleProductResponse>(
    `/public-products/${slug}`, true
  );

  return (
    <section>
      <SingleProductSection />
      <DetailDecription />
      <Review reviews={data?.reviews || []} />

    </section>
  )
}

export default SingleProductPage
