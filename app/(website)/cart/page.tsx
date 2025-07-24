import React from "react";
import ShoppingCart from "./components/shopping-cart";
import Testimonials from "@/components/common/testimonials/testimonials";
import RecommendedCartProducts from "./components/recommended-cart-products";

const CartPage = () => {
  return (
    <main className="space-y-8">
      <ShoppingCart />
      <RecommendedCartProducts />
      <Testimonials />
    </main>
  );
};

export default CartPage;
