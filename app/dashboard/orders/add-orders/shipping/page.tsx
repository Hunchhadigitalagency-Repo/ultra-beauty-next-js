"use client";

import React, { useState } from "react";

import { toast } from "sonner";
import { getVoucherDetails } from "@/lib/api/order/voucher-apis";
import {
  calculateSubtotal,
  calculateTaxAmount,
  calculateTotalItems,
} from "@/lib/cart-utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShippingFees, setVoucher } from "@/redux/features/checkout-slice";
import OrderItems from "../components/order-items";
import OrderSummary from "../components/order-summery-dashboard";
import ShippingForm from "../components/dashboard-shiping-form";
import { ShippingFormValuesAdmin } from "@/schemas/checkout/checkout-dashboard";
import { getShippingAdminFees } from "@/lib/api/order/order-apis";

const CheckoutDetails = () => {
  const { productItems, voucher, shippingFees } = useAppSelector((state) => state.checkouts);
  const dispatch = useAppDispatch();

  const [voucherCode, setVoucherCode] = useState("");
  const [shippingData, setShippingData] = useState<
    Partial<ShippingFormValuesAdmin>
  >({});
  const [shippingFee, setShippingFee] = useState<number>()

  const getCity = async (city: string) => {
    const product_ids = productItems.map((item: any) => item.id);

    if (product_ids && city) {
      const response = await getShippingAdminFees(product_ids, city);
      setShippingFee(response.data.rate);
      dispatch(setShippingFees(response.data.rate));
    }
  };

  const handleApplyVoucher = async () => {
    try {
      const voucher = await getVoucherDetails(voucherCode);
      dispatch(setVoucher(voucher.data));
      localStorage.setItem("voucher", JSON.stringify(voucher));
      toast.success("Voucher applied successfully");
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        "Failed to apply voucher. Make sure it is valid.";
      toast.error(message);
    }
  };

  // console.log("this is the checkout carts", checkoutCarts)
  const selectedItems = productItems.filter((item: any) => item.selected);
  const totalItems = calculateTotalItems(selectedItems);
  const subtotal = calculateSubtotal(selectedItems);
  const taxAmount = calculateTaxAmount(selectedItems);

  const discount = voucher
    ? (voucher?.coupon?.discount_percentage / 100) * subtotal
    : 0;
  const total = subtotal + taxAmount - discount;

  return (
    <section className="space-y-4">
      <OrderItems isShipping={true} />
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-6">
          <ShippingForm
            onDataChange={setShippingData}
            getCity={getCity}
            isWebsite={false}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <OrderSummary
            location={""}
            shippingData={shippingData}
            totalItems={totalItems}
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee || null}
            taxAmount={taxAmount}
            total={total}
            voucherCode={voucherCode}
            onVoucherCodeChange={setVoucherCode}
            onApplyVoucher={handleApplyVoucher}
            isCheckout={true}
            products={productItems.map((item: any) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.currentPrice,
              total: item.currentPrice * item.quantity,
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
