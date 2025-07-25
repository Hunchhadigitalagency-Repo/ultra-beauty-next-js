import React from 'react';
import BrandsSection from './components/brand-main-section';
import BrandsDescSection from './components/brands-that-you-love-desc';

const Brands: React.FunctionComponent = () => {
  return (
    <>
      <BrandsSection />
      <BrandsDescSection />
    </>
  )
}

export default Brands