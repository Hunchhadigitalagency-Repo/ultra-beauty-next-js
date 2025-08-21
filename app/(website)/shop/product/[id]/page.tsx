
import React from 'react';
import Review from './components/review';
import TechnicalDetails from './components/technical-details';
import SingleProductSection from './components/single-product-section';
import DetailDecription from './components/detail-description-section';




const SingleProductPage: React.FunctionComponent = () => {

  return (
    <main>
      <SingleProductSection />
      <DetailDecription />
      <TechnicalDetails />
      <Review />
    </main>
  )
}

export default SingleProductPage
