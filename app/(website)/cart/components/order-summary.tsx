"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/cart-utils";
import { useRouter } from "next/navigation";

interface OrderSummaryProps {
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  location: string;
  voucherCode: string;
  onVoucherCodeChange: (code: string) => void;
  onApplyVoucher: () => void;
  isCheckout?: boolean;
}

export default function OrderSummary({
  totalItems,
  subtotal,
  shippingFee,
  total,
  voucherCode,
  location,
  onVoucherCodeChange,
  onApplyVoucher,
  isCheckout = false,
}: OrderSummaryProps) {
  const router = useRouter();

  return (
    <div className="bg-[#EFEFEF] rounded-lg p-4 space-y-4">
      <div className="flex flex-col items-start  gap-2 border-b pb-4 border-[#6F6F6F]">
        <h3 className="font-medium text-base text-foreground">Location</h3>
        <div className="flex gap-2 items-start">
          <div className="rounded-full size-8 p-2 flex items-center justify-center bg-[#D9D9D9]">
            <MapPin className="w-6 h-6" />
          </div>

          <p className="text-sm font-medium text-custom-black">{location}</p>
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
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping fee</span>
            <span className="text-foreground">{formatPrice(shippingFee)}</span>
          </div>
        </div>
      </div>

      {/* Voucher Code */}
      <div className="flex">
        <Input
          placeholder="Enter Voucher Code"
          value={voucherCode}
          onChange={(e) => onVoucherCodeChange(e.target.value)}
          className="text-sm rounded-none h-10 bg-white"
        />
        <Button
          className="bg-green-600 hover:bg-green-700 rounded-none h-10"
          onClick={onApplyVoucher}
        >
          Apply
        </Button>
      </div>

      <div className="pt-4">
        <div className="flex justify-between font-semibold ">
          <span className="text-base text-custom-black">Total</span>
          <span className="text-lg text-foreground">{formatPrice(total)}</span>
        </div>
        {isCheckout && (
          <p className="mt-1 text-accent-foreground text-sm text-right">
            All Tax included
          </p>
        )}
      </div>

      {!isCheckout && (
        <Button
          className="w-full bg-yellow hover:bg-yellow-500 text-black font-medium"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout
        </Button>
      )}

      {!isCheckout && (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            className=" text-sm hover:text-orange"
            onClick={() => router.push("/shop")}
          >
            CONTINUE SHOPPING
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
