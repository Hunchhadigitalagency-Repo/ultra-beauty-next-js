import HeroCarousel from "@/components/common/carousel/hero-carousel";
import React from "react";
import AllProducts from "./components/all-products";
import DifferentiatorSection from "../../../components/common/differentiator/differentiator-section";
import Testimonials from "@/components/common/testimonials/testimonials";

const ShopPage = () => {
  return (
    <main className="">
      <HeroCarousel />
      <AllProducts />
      <DifferentiatorSection hasButton={false} />
      <Testimonials />
    </main>
  );
};

export default ShopPage;
