import React from "react";
import ShoppingCart from "./components/shopping-cart";
import RecommendedCartProducts from "./components/recommended-cart-products";
import Testimonials from "@/components/common/testimonials/testimonials";

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
