"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { formatPrice } from "@/lib/cart-utils";
import { Button } from "@/components/ui/button";
import { OrderSummaryProps } from "@/types/cart";
import { ArrowRight, Info, MapPin } from "lucide-react";
import GenericModal from "@/components/common/modals/generic-modal";
import CircularProgressBar from "@/components/common/circular-progress-bar/circular-progress-bar";
export default function OrderSummary({
  totalItems,
  shippingFee,
  voucherCode,
  shippingDetails,
  onVoucherCodeChange,
  onApplyVoucher,
  applyVoucher,
  isCheckout,
}: OrderSummaryProps) {


  const router = useRouter();
  const progress = [50];
  const { voucherData, cartItem } = useAppSelector(state => state.cart)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isRewardsModalOpen, setisRewardsModalOpen] = useState<boolean>(false);
  const { firstName, lastName, address, phoneNumber, alternativePhoneNumber, city } = shippingDetails || {};

  // Calculations
  const subTotal = cartItem.reduce((sum, item) => sum + (parseFloat(item.price)), 0);
  const taxPercentage = cartItem.reduce((sum, item) => sum + (item.tax_applied ? item.tax_applied.tax_percentage : 0), 0);
  const taxAmount = cartItem.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const tax = item.tax_applied ? (price * item.tax_applied.tax_percentage) / 100 : 0;
    return sum + tax;
  }, 0);

  const voucherDiscount = parseFloat(voucherData?.coupon?.discount_percentage ?? "0") / 100 * subTotal;
  const Total = subTotal + shippingFee + taxAmount - voucherDiscount;


  return (
    <div className="bg-[#EEEEEE] rounded-lg p-4 space-y-4">
      <div className="flex flex-col items-start  gap-2 border-b pb-4 border-[#6F6F6F]">
        <div className="w-full flex justify-between items-center">
          <h3 className="font-medium text-base text-foreground">Location</h3>
          <button onClick={() => setIsLocationModalOpen(!isLocationModalOpen)} className="text-sm cursor-pointer text-primary">Change Location</button>
        </div>
        <div className="flex gap-2 items-start">
          <div className="rounded-full size-8 p-2 flex items-center justify-center bg-secondary">
            <MapPin className="w-6 h-6 text-white" />
          </div>

          <p className="text-sm flex flex-col font-medium text-custom-black">
            <span>
              {firstName}{lastName}
            </span>
            <span>
              {phoneNumber}{alternativePhoneNumber}
            </span>
            <span>
              {address}
            </span>
            <span>
              {address}{city}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-foreground text-base">Order Summary</h3>

        <div className="space-y-2 text-base text-custom-black font-medium">
          <div className="flex justify-between">
            <span>Total Item</span>
            <span className="text-foreground">{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span className="text-foreground">{formatPrice(subTotal)}</span>
          </div>
          {
            taxAmount > 0 && (
              <div className="flex justify-between">
                <span>Tax ({`${taxPercentage}%`}) </span>
                <span className="text-foreground">{formatPrice(taxAmount)}</span>
              </div>
            )
          }
          <div className="flex justify-between">
            <span>Shipping fee</span>
            <span className="text-foreground">{formatPrice(shippingFee)}</span>
          </div>
        </div>
      </div>

      {/* Voucher Code */}
      {
        voucherDiscount > 0 && (
          <div className="flex justify-between text-base text-custom-black font-medium">
            <span>Voucher Discount</span>
            <span className="text-foreground">-Nrs.{voucherDiscount}</span>
          </div>
        )
      }
      {
        applyVoucher && !voucherData && (
          <div className="flex">
            <Input
              placeholder="Enter Voucher Code"
              value={voucherCode}
              onChange={(e) => onVoucherCodeChange?.(e.target.value)}
              className="text-sm rounded-none h-10 bg-white"
            />
            <Button
              className="bg-primary rounded-none h-10"
              onClick={onApplyVoucher}
            >
              Apply
            </Button>
          </div>
        )
      }

      <div className="pt-4">
        <div className="flex justify-between font-semibold ">
          <span className="text-base text-custom-black">Total</span>
          <span className="text-lg text-foreground">{formatPrice(Total)}</span>
        </div>
        {isCheckout && (
          <p className="mt-1 text-accent-foreground text-sm text-right">
            All Tax included
          </p>
        )}
      </div>

      <Button
        className="w-full flex justify-between bg-secondary text-white font-medium"
        onClick={() => setisRewardsModalOpen(!isRewardsModalOpen)}
      >
        Apply For Rewards Points
        <Info className="w-5 h-5" />
      </Button>

      {
        isCheckout &&
        <Button
          disabled={!isCheckout}
          className="w-full bg-primary text-white font-medium"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      }

      {isCheckout && (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            className=" text-sm hover:text-secondary"
            onClick={() => router.push("/shop")}
          >
            CONTINUE SHOPPING
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
      {
        isLocationModalOpen && (
          <GenericModal title="Change Delivery Location" setIsOptionClick={() => setIsLocationModalOpen(false)}>
            <div className="flex flex-col gap-3">
              <textarea rows={3} className="w-full p-3 border-[1px] outline-0 border-[#E3E3E3] text-gray" placeholder="Type your Location Here ....." />
              <Button
                className="w-full bg-primary text-white font-medium"
                onClick={() => setIsLocationModalOpen(false)}
              >
                Change
              </Button>
            </div>
          </GenericModal>
        )
      }

      {
        isRewardsModalOpen && (
          <GenericModal title="Total Rewards Points" setIsOptionClick={() => setisRewardsModalOpen(false)}>
            <div>
              <div className="flex items-center gap-5 ">
                <CircularProgressBar
                  value={progress[0]}
                  size={120}
                  strokeWidth={10}
                  showLabel
                  labelClassName="text-xl font-bold"
                  renderLabel={(progress) => `${progress}%`}
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-xl">350 Points</h1>
                  <p className="font-medium text-base">Points till your next purchases</p>
                </div>
              </div>

            </div>
          </GenericModal>
        )
      }
    </div>
  );
}
