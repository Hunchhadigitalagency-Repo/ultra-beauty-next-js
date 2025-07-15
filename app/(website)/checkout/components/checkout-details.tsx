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
                    "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
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
          <div className="flex items-center justify-center">
            <Link
              href={"/shop"}
              className="text-primary transition-all duration-300 ease-in-out flex items-center gap-2 uppercase text-xl hover:text-sky-500"
            >
              <span className="font-bold">CONTINUE TO SHOP </span>
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
