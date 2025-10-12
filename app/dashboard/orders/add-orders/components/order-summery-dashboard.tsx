"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/cart-utils";
import { useRouter } from "next/navigation";
// import { ShippingFormValues } from "@/schemas/checkout/checkout-schema";

interface ProductLineItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface OrderSummaryProps {
  shippingData?: any;
  totalItems: number;
  subtotal: number;
  shippingFee?: number | null;
  discount?: number;
  total: number;
  location?: string;
  voucherCode?: string;
  onVoucherCodeChange?: (code: string) => void;
  onApplyVoucher?: () => void;
  isCheckout?: boolean;
  handleProceedCheckout?: () => void;
  products?: ProductLineItem[];
  showLocation?: boolean;
  taxAmount?: number
  isVoucherApplied?: boolean,
  isCart?: boolean;
}

export default function OrderSummary({
  shippingData,
  totalItems,
  subtotal,
  shippingFee,
  total,
  location,
  discount,
  taxAmount,
  isVoucherApplied = false,
  showLocation = true,
  onVoucherCodeChange,
  onApplyVoucher,
  isCheckout = false,
  handleProceedCheckout,
  isCart,
  products = [],
}: OrderSummaryProps) {
  const router = useRouter();
// .

  return (
    <div className="bg-[#EFEFEF] rounded-lg p-4 space-y-4">
      {/* Location */}
      {/* Location + Shipping Data */}
      {showLocation && (
        <div className="flex flex-col items-start gap-2 pb-4 border-[#6F6F6F]">
          <div className="flex gap-4 items-center">
            <h3 className="font-medium text-base text-foreground">Location</h3>
            <div className="rounded-full size-8 p-2 flex items-center justify-center bg-[#D9D9D9]">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <div className="text-sm font-medium text-custom-black">
              <p>{location}</p>
              {shippingData && (
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {shippingData.first_name || shippingData.last_name ? (
                    <p>
                      {shippingData.first_name} {shippingData.last_name}
                    </p>
                  ) : null}
                  {shippingData.phone_no && <p>Phone: {shippingData.phone_no}  {shippingData.alternate_phone_no && `| ${shippingData.alternate_phone_no}`}</p>}
                  {shippingData.email && <p>Email: {shippingData.email}</p>}
                  {(shippingData.address || shippingData.city || shippingData.province) && (
                    <p>
                      {[shippingData.address, shippingData.city, shippingData.province]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {/* Order Summary */}
      <div className="space-y-2">
        {!isCart && products.length > 0 && (
          <div className="mt-4 pt-4 border-[#6F6F6F] space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Products</h4>
            {products.map((product) => (
              <div
                key={product.id}
                className="text-sm text-custom-black space-y-1 border-b pb-2"
              >
                <div className="flex justify-between font-medium">
                  <span>{product.name} (x{product.quantity})</span>
                  <span>{formatPrice(product.total)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Unit Price: {formatPrice(product.price)}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-2 text-base text-custom-black font-medium">
          <div className="flex justify-between">
            <span>Total Item</span>
            <span className="text-foreground">{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>

          </div>
          <div className="w-full">
            {discount ? discount > 0 && (
              <div className="flex justify-between">
                <span className=""> Voucher Discount Amt</span>
                <span>{discount.toFixed(2)}</span>
              </div>
            )
              : <></>
            }

          </div>
          <div className="flex justify-between">
            <span>

              Tax Amount
            </span>
            <span>
              {formatPrice(taxAmount || 0)}
            </span>

          </div>
          {
            shippingFee &&
            <div className="flex justify-between">
              <span>Shipping fee</span>
              <span className="text-foreground">{formatPrice(shippingFee)}</span>
            </div>
          }
        </div>

      </div>

      {/* Voucher Code - Only in checkout */}
      {isCheckout && (
        <div className="flex">
          <Input
            placeholder="Enter Voucher Code"
            onChange={(e) => onVoucherCodeChange?.(e.target.value)}
            className="text-sm rounded-none h-10 bg-white"
          />
          <Button
            className="bg-pink-600 hover:bg-pink-700 rounded-none h-10"
            onClick={onApplyVoucher}
          >
            Apply
          </Button>
        </div>
      )}

      {
        isVoucherApplied && (
          <div className="pt-4">
            <span>Voucher Applied</span>
          </div>
        )
      }
      {/* Total */}
      <div className="pt-4">
        <div className="flex justify-between font-semibold">
          <span className="text-base text-custom-black">Total</span>
          <span className="text-lg text-foreground">{formatPrice(total)}</span>
        </div>
        <p className="mt-1 text-accent-foreground text-sm text-right">
          All Tax included
        </p>
      </div>

      {/* Checkout Button - Only in Shopping Cart */}
      {isCart && (
        <>
          <Button
            className="w-full bg-yellow hover:bg-yellow-500 text-black font-medium"
            onClick={handleProceedCheckout}
          >
            Proceed to Checkout
          </Button>
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              className="text-sm hover:text-orange"
              onClick={() => router.push("/shop")}
            >
              CONTINUE SHOPPING
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}