"use client"

import React from 'react';
import Review from './components/review';
import SingleProductSection from './components/single-product-section';

const SingleProductPage: React.FunctionComponent = () => {

  return (
    <main>
      <SingleProductSection />
      <Review />
    </main>
  )
}

export default SingleProductPage
