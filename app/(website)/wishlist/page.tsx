
import React from "react";
import WishlistedProducts from "./components/wishlisted-products";
import RecommendedProducts from "../../../components/common/product/recommended-products";
import HeroCarousel from "@/components/common/carousel/hero-carousel";


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
