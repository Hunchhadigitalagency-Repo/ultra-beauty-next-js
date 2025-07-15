import React from 'react'
import SingleProductSection from './components/single-product-section'
import RecommendationCarousel from '@/components/common/carousel/recommendation-carousel'
import DifferentiatorSection from '@/components/common/differentiator/differentiator-section'
import Testimonials from '@/components/common/testimonials/testimonials'
import OtherSimilarProducts from './components/other-similar-products'
import FAQSection from '@/components/common/faq/faq-section'

const SingleProductPage = () => {
  return (
    <main>
       <SingleProductSection />
       <RecommendationCarousel />
       <DifferentiatorSection hasButton={false} />
       <Testimonials />
       <FAQSection />
       <OtherSimilarProducts />
    </main>
  )
}

export default SingleProductPage
