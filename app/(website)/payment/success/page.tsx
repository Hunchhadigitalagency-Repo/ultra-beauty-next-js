"use client";

import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { updateOrder } from "@/lib/api/order/order-apis";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  setOrderId,
  setShippingFee,
} from "@/redux/features/cart-slice";
import { generateClientHash } from "@/lib/utils";
import { updateCartAndWishlistCounts } from "@/lib/update-count";

type PaymentStatus = "loading" | "success" | "mismatch" | "error";

const Success: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { orderId, cartItem } = useAppSelector((state) => state.cart);
const {accessToken} = useAppSelector(state => state.authentication)
  const hasOrdered = useRef(false);
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("loading");

  useEffect(() => {
    if (hasOrdered.current) return;
    hasOrdered.current = true;

    const handleOrder = async () => {
      try {
        const encodedData = searchParams.get("token");
        const qrStatus = searchParams.get("status");

        if (!orderId) {
          setPaymentStatus("error");
          return;
        }

        // ---------------- QR PAYMENT ----------------
        if (qrStatus === "COMPLETE") {
          const response = await updateOrder(orderId, "paid");

          if (response.status === 200) {
            dispatch(setOrderId(null));
updateCartAndWishlistCounts(dispatch, accessToken)
            dispatch(clearCart());
            dispatch(setShippingFee(""));
            setPaymentStatus("success");
            return;
          }
        }

        // ---------------- TOKEN PAYMENT ----------------
        if (!encodedData) {
          setPaymentStatus("error");
          return;
        }

        const decoded = JSON.parse(atob(encodedData));
        const { id, oprSecret, total_amount, transaction_code, transaction_uuid } =
          decoded;

        const oprKey = process.env.NEXT_PUBLIC_OPR_KEY || "";
        const clientHash = await generateClientHash(oprKey, id);

        // ❌ HASH MISMATCH
        if (clientHash !== oprSecret) {
          console.error("Payment hash mismatch");
          setPaymentStatus("mismatch");
          return;
        }

        // ✅ VERIFIED
        const response = await updateOrder(
          orderId,
          "paid",
          total_amount || 0,
          transaction_code,
          transaction_uuid
        );

        if (response.status === 200) {
          dispatch(setOrderId(null));
updateCartAndWishlistCounts(dispatch, accessToken)
          dispatch(clearCart());
          dispatch(setShippingFee(""));
          setPaymentStatus("success");
        } else {
          setPaymentStatus("error");
        }
      } catch (err) {
        console.error("Payment confirmation error:", err);
        setPaymentStatus("error");
      }
    };

    handleOrder();
  }, [searchParams, orderId, cartItem.length, dispatch]);

  // ---------------- UI STATES ----------------

  if (paymentStatus === "loading") {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-sm">Verifying your payment...</p>
      </div>
    );
  }

  if (paymentStatus === "mismatch") {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <h3 className="text-red-600 font-semibold text-lg">
            Payment Verification Failed
          </h3>
          <p className="text-sm mt-2">
            Your payment could not be verified. Please contact support.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 text-primary underline"
          >
            Go back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center padding-x h-[70vh] xl:h-[calc(100vh-160px)]">
      <div className="flex flex-col gap-4 text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto text-3xl text-white rounded-full bg-green">
          <FaCheck />
        </div>

        <h3 className="text-base font-semibold md:text-lg">
          Payment Successful!
        </h3>

        <p className="text-xs md:text-sm">
          Your payment has been successfully confirmed. Thank you for trusting us!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/shop"
            className="px-5 py-2 text-xs text-white md:text-sm bg-primary"
          >
            Continue Shopping
          </Link>

          <Link
            href="/profile"
            className="px-5 py-2 text-xs md:text-sm text-primary border border-gray-300"
          >
            Order Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
