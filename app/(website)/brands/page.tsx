import React from 'react';
import BrandsSection from './components/brand-main-section';
import BrandsDescSection from './components/brands-that-you-love-desc';
import Testimonial from '../components/Testimonials/testimonial';

const Brands: React.FunctionComponent = () => {

  return (
    <>
      <BrandsSection />
      <BrandsDescSection />
      <Testimonial />
    </>
  )
}

export default Brands