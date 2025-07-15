"use client";

import React from 'react'
import FeaturedProductCard from './featured-product-card';
import { IFeature } from '@/types/product';

const FeaturedProducts = () => {
     const features1: IFeature[] = [
    { label: "50% OFF", position: "top-0 right-0  !bg-red text-white" },
    { label: "10% OFF", position: "bottom-0 right-0  !bg-red text-white" },
  ];

  const features2: IFeature[] = [
    { label: "Ø 22 cm", position: "top-4 left-8" },
    { label: "Ø 60 cm", position: "bottom-4 right-8" },
  ];
  return (
    <div className="space-y-12 p-8">
        <FeaturedProductCard
          imageSrc="https://img.freepik.com/premium-photo/cushions-empty-couch_1048944-24773952.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Sleek Pregnancy Cushion"
          title="Sleek Pregnancy Cushion"
          description="A product tha will help the Preganancy women to grow and some random text that fits here. This is the random Text that fits here. This is the random text that fits here.  A product tha will help the Preganancy women to grow and some random text that fits here. This is the random Text that fits here. This is the random text that fits here.  A product tha will help the Preganancy women to grow and some random text that fits here. This is the random Text that fits here. This is the random text that fits here. "
          features={features1}
          rating={4.5}
          ratingCount={265}
          buttonText="SHOP NOW"
          onButtonClick={() => {}}
        />

        <FeaturedProductCard
          imageSrc="https://img.freepik.com/premium-photo/mustard-leather-cushions-black-background_926199-3213456.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Sleek Pregnancy Cushion Dimensions"
          title="Sleek Pregnancy Cushion – Sizes"
          description="Choose the perfect diameter for your body type: small Ø22 cm for travel, large Ø60 cm for maximum support."
          features={features2}
          rating={4.5}
          ratingCount={265}
          buttonText="SHOP NOW"
          onButtonClick={() => {}}
          reverse
        />
   
      </div>
  )
}

export default FeaturedProducts
