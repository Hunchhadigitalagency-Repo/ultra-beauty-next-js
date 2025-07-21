"use client";

import React from "react";
import ShippingForm from "./shipping-details-form";
import OrderSummary from "../../cart/components/order-summary";
import CheckoutProductHeader from "./checkout-product-header";
import CheckoutProductCard from "./checkout-product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CheckoutDetails = () => {
  return (
    <section className=" space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-5 space-y-6">
          <ShippingForm />
          <section className="space-y-4">
            <div className="space-y-4">
              <CheckoutProductHeader
                selectedItem={1}
                totalItems={5}
                totalQuantity={2}
              />
              <CheckoutProductCard
                item={{
                  id: 1,
                  name: "Sleek Pregnancy Cushion with some random text abd long text",
                  description:
                    "Pregnancy Care / Pillow/ Name of the Project will go here and it can be long but with some long text",
                  image:
                    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  color: "Blue",
                  size: "XXL",
                  originalPrice: 45000,
                  currentPrice: 45000,
                  discount: 20,
                  quantity: 1,
                  selected: true,
                }}
              />
            </div>
          </section>
          <div className="flex items-center justify-end">
            <Link
              href={"/shop"}
              className="text-foreground transition-all duration-300 ease-in-out flex items-center gap-2 uppercase text-xl"
            >
              <span className="font-bold uppercase">Continue Shopping </span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <OrderSummary
            location={"location"}
            totalItems={5}
            subtotal={590}
            shippingFee={1500}
            total={15000}
            voucherCode={"voucherCode"}
            onVoucherCodeChange={(code) => console.log(code)}
            onApplyVoucher={() => console.log("Apply Voucher")}
            isCheckout={true}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
