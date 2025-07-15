import React from "react";
import CheckoutDetails from "./components/checkout-details";
import SectionHeader from "@/components/common/header/section-header";

const CheckoutPage = () => {
  return (
    <main className="space-y-4 padding">
      <SectionHeader
        title="Checkout"
        description="Purchase the products you have selected"
      />
      <CheckoutDetails />
    </main>
  );
};

export default CheckoutPage;
