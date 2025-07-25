"use client";

import React from "react";
import AllProducts from "../shop/components/all-products";
import HeroCarousel from "@/components/common/carousel/hero-carousel";
import Testimonials from "@/components/common/testimonials/testimonials";
import DifferentiatorSection from "@/components/common/differentiator/differentiator-section";


const BestSellerPage: React.FunctionComponent = () => {
  return (
    <div>
      <HeroCarousel />
      <AllProducts />
      <DifferentiatorSection hasButton={false} />
      <Testimonials />
    </div>
  );
};

export default BestSellerPage;
