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
  voucherCode,
  shippingDetails,
  onVoucherCodeChange,
  onApplyVoucher,
  applyVoucher,
  isCheckout = false,
}: OrderSummaryProps) {


  const router = useRouter();
  const progress = [50];
  const { voucherData, cartItem, shippingFee } = useAppSelector(state => state.cart);
  const [isRewardsModalOpen, setisRewardsModalOpen] = useState<boolean>(false);
  const { firstName, lastName, address, phoneNumber, alternativePhoneNumber, city } = shippingDetails || {};

  // Subtotal and Tax Calculation
  const subTotal = cartItem.reduce((sum, item) => sum + (parseFloat(item.price)), 0);
  const taxPercentage = cartItem.reduce((sum, item) => sum + (item.tax_applied ? item.tax_applied.tax_percentage : 0), 0);
  const taxAmount = cartItem.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const tax = item.tax_applied ? (price * item.tax_applied.tax_percentage) / 100 : 0;
    return sum + tax;
  }, 0);

  // Voucher Discount and Total Calculation
  const voucherDiscount = parseFloat(voucherData?.coupon?.discount_percentage ?? "0") / 100 * subTotal;
  const Total = subTotal + Number(shippingFee) + taxAmount - voucherDiscount;


  return (
    <div className="order-2 p-4 space-y-4 rounded-lg bg-secondary">
      {
        isCheckout && (
          <div className="flex flex-col items-start  gap-2 border-b pb-4 border-[#6F6F6F]">
            <div className="flex items-center w-full gap-2">
              <div className="flex items-center justify-center p-2 rounded-full bg-primary">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-medium text-foreground">Shipping Details</h3>
            </div>
            <div className="flex items-start gap-2">


              <p className="flex flex-col pl-10 text-sm font-medium text-custom-black">
                <span>
                  {firstName} {lastName}
                </span>
                <span>
                  {phoneNumber}{alternativePhoneNumber && ` | ${alternativePhoneNumber}`}
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
        )
      }

      <div className="space-y-2">
        <h3 className="text-base font-medium text-foreground">Order Summary</h3>

        <div className="space-y-2 text-base font-medium text-custom-black">
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
          {
            isCheckout && (
              <div className="flex justify-between">
                <span>Shipping fee</span>
                <span className="text-foreground">{formatPrice(Number(shippingFee))}</span>
              </div>
            )
          }
        </div>
      </div>

      {/* Voucher Code */}
      {
        voucherDiscount > 0 && (
          <div className="flex justify-between text-base font-medium text-custom-black">
            <span>Voucher Discount</span>
            <span className="text-foreground">{formatPrice(voucherDiscount)}</span>
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
              className="h-10 text-sm bg-white rounded-none"
            />
            <Button
              className="h-10 rounded-none bg-primary"
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
        {
          isCheckout && (
            <p className="mt-1 text-sm text-right text-accent-foreground">
              All Tax included
            </p>
          )
        }
      </div>

      <Button
        className="flex justify-between w-full font-medium text-white bg-blue"
        onClick={() => setisRewardsModalOpen(!isRewardsModalOpen)}
      >
        Apply For Rewards Points
        <Info className="w-5 h-5" />
      </Button>

      {
        !isCheckout &&
        <Button
          disabled={!cartItem.length}
          className="w-full font-medium text-white bg-primary"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      }

      {
        cartItem.length === 0 && (
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              className="text-sm hover:text-secondary"
              onClick={() => router.push("/shop")}
            >
              CONTINUE SHOPPING
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
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
                  <h1 className="text-xl font-semibold">350 Points</h1>
                  <p className="text-base font-medium">Points till your next purchases</p>
                </div>
              </div>

            </div>
          </GenericModal>
        )
      }
    </div>
  );
}