"use client";

import HeroCarousel from "@/components/common/carousel/hero-carousel";
import React from "react";

import DifferentiatorSection from "../../../components/common/differentiator/differentiator-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import AllProducts from "../shop/components/all-products";

const BestSellerPage = () => {
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
