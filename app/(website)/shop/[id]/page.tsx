"use client";

import HeroCarousel from "@/components/common/carousel/hero-carousel";
import React from "react";
import Testimonials from "@/components/common/testimonials/testimonials";
import DifferentiatorSection from "@/components/common/differentiator/differentiator-section";
import AllProducts from "../components/all-products";

const ShopByCategoryPage = () => {

  return (
    <main>
      <HeroCarousel />
      <AllProducts/>
      <DifferentiatorSection hasButton={false} />
      <Testimonials />
    </main>
  );
};

export default ShopByCategoryPage;
