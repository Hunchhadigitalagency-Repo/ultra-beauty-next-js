import React from 'react';
// import FAQSection from '@/components/common/faq/faq-section';
import OtherSimilarProducts from './components/other-similar-products';
import SingleProductSection from './components/single-product-section';
// import Testimonials from '@/components/common/testimonials/testimonials';
// import RecommendationCarousel from '@/components/common/carousel/recommendation-carousel';
// import DifferentiatorSection from '@/components/common/differentiator/differentiator-section';

const SingleProductPage: React.FunctionComponent = () => {
  return (
    <main>
      <SingleProductSection />
      {/* <RecommendationCarousel />
       <DifferentiatorSection hasButton={false} />
       <Testimonials />
       <FAQSection /> */}
      <OtherSimilarProducts />
    </main>
  )
}

export default SingleProductPage
