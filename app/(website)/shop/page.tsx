import React from "react";
import AllProducts from "./components/all-products";
import HeroSection from "../components/hero/hero-section";

const ShopPage: React.FunctionComponent = () => {
  return (
    <main className="space-y-8">
      <HeroSection />
      <AllProducts />
    </main>
  );
};

export default ShopPage;
