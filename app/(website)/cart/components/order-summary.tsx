"use client";

import { useState } from "react";
// import { set } from "date-fns";
// import { is } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/cart-utils";
import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
import { ArrowRight, Info, MapPin } from "lucide-react";
import GenericModal from "@/components/common/modals/generic-modal";
import CircularProgressBar from "@/components/common/circular-progress-bar/circular-progress-bar";

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
  const progress = [50];
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isRewardsModalOpen, setisRewardsModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-secondary rounded-lg p-4 space-y-4">
      <div className="flex flex-col items-start  gap-2 border-b pb-4 border-[#6F6F6F]">
        <div className="w-full flex justify-between items-center">
          <h3 className="font-medium text-base text-foreground">Location</h3>
          <button onClick={() => setIsLocationModalOpen(!isLocationModalOpen)} className="text-sm cursor-pointer text-primary">Change Location</button>
        </div>
        <div className="flex gap-2 items-start">
          <div className="rounded-full size-8 p-2 flex items-center justify-center bg-primary">
            <MapPin className="w-6 h-6 text-white" />
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
          className="bg-primary rounded-none h-10"
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

      <Button
        className="w-full flex justify-between bg-blue text-white font-medium"
        onClick={() => setisRewardsModalOpen(!isRewardsModalOpen)}
      >
        Apply For Rewards Points
        <Info className="w-5 h-5" />
      </Button>

      {!isCheckout && (
        <Button
          className="w-full bg-primary text-white font-medium"
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
