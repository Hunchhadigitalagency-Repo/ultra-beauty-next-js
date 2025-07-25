"use client";

import React from "react";
import AllProducts from "../components/all-products";
import HeroCarousel from "@/components/common/carousel/hero-carousel";
import Testimonials from "@/components/common/testimonials/testimonials";
import DifferentiatorSection from "@/components/common/differentiator/differentiator-section";

const ShopByCategoryPage = () => {

  return (
    <main>
      <HeroCarousel />
      <AllProducts />
      <DifferentiatorSection hasButton={false} />
      <Testimonials />
    </main>
  );
};

export default ShopByCategoryPage;
