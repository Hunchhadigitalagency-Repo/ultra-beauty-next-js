import React from "react";
import WishlistedProducts from "./components/wishlisted-products";
import HeroCarousel from "@/components/common/carousel/hero-carousel";
import RecommendedProducts from "../../../components/common/product/recommended-products";


const WishlistPage = () => {

  return (
    <main className="space-y-8">
      <WishlistedProducts />
      <RecommendedProducts />
      <HeroCarousel />

    </main>
  );
};

export default WishlistPage;
