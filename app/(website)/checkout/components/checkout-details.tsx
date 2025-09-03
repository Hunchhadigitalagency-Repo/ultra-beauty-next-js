"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartResultType } from "@/types/cart";
import ShippingForm from "./shipping-details-form";
import CheckoutProductCard from "./checkout-product-card";
import React, { useEffect, useMemo, useState } from "react";
import CheckoutProductHeader from "./checkout-product-header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import OrderSummary from "../../cart/components/order-summary";
import { applyVoucher, getCartItemsByIds } from "@/lib/api/cart/cart-apis";
import { setVoucherData } from "@/redux/features/cart-slice";
import { ShippingFormValues } from "@/schemas/checkout/checkout-schema";


const CheckoutDetails: React.FunctionComponent = () => {

  const shippingFee = 150;
  const dispatch = useAppDispatch();
  const [voucher, setVoucher] = useState('');
  const [cartData, setCartData] = useState<CartResultType[]>()
  const { cartItem } = useAppSelector((state) => state.cart);
  const cartIds = useMemo(() => cartItem.map((item) => item.id), [cartItem]);
  const [formDetails, setFormDetails] = useState<ShippingFormValues | null>(null);


  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (cartIds.length === 0) return;
        const response = await getCartItemsByIds(cartIds);
        setCartData(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchCartData();
  }, [cartIds]);

  const handleApplyVoucher = async () => {
    const response = await applyVoucher(voucher);
    if (response.status === 200) {
      dispatch(setVoucherData(response.data))
    }
  }

  return (
    <section className="space-y-4 ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        {/* Cart Items */}
        <div className="order-1 space-y-6 lg:col-span-5">
          <ShippingForm
            onChange={setFormDetails}
          />
          <section className="space-y-4">
            {
              cartData?.map((item, index) => (
                <div key={item.id} className="space-y-4">
                  <CheckoutProductHeader
                    selectedItem={index + 1}
                    totalItems={cartData.length}
                    totalQuantity={item.quantity}
                  />
                  <CheckoutProductCard
                    item={item}
                  />
                </div>
              ))
            }
          </section>
          <div className="flex items-center justify-end">
            <Link
              href={"/shop"}
              className="flex items-center gap-2 text-xl uppercase transition-all duration-300 ease-in-out text-foreground"
            >
              <span className="font-bold uppercase">Continue Shopping </span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="order-2 space-y-6 lg:col-span-2">
          <OrderSummary
            shippingDetails={formDetails}
            applyVoucher
            totalItems={cartItem.length}
            shippingFee={shippingFee}
            voucherCode={voucher}
            onVoucherCodeChange={setVoucher}
            onApplyVoucher={handleApplyVoucher}
            isCheckout={false}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
