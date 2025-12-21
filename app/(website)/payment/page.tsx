"use client";
import Image from "next/image";
import { toast } from "sonner";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { addOrders } from "@/lib/api/order/order-apis";
import CashOnDelivery from "@/assets/cash-on-delivery.png";
import GetPay from "@/assets/getpay.jpeg";
import PhonePay from "@/assets/unnamed.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import SectionHeader from "@/components/common/header/section-header";

import OrderSummary from "@/app/(website)/cart/components/order-summary";
import {
  clearCart,
  decreaseCartCountBy,
  setOrderId,
  setShippingFee,
} from "@/redux/features/cart-slice";
import { getOrderInformationHtml } from "./components/get-order-html";
import { DynamicQr } from "./helper/dynamic_qr";
import QrPaymentModal from "./components/qr-payment-modal";
import { handleError } from "@/lib/error-handler";
import { Spinner } from "@/components/ui/spinner";

const PAYMENT_GATEWAYS = [
  { name: "Cash on Delivery (COD)", image: CashOnDelivery, value: "cod" },
  { name: "Get Pay (Card)", image: GetPay, value: "getpay" },
  { name: "Phonepay (QR)", image: PhonePay, value: "qr" },
];

export interface QrPayment {
  dynamicOrImg: string;
  loading: boolean;
  error: string;
}

const imageUrl =
  "https://ultrabeauty.blr1.digitaloceanspaces.com/media/company_favicons/pink_icon.png";

const Payment: React.FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(
    null
  );

  const [qrPayment, setQrPayment] = useState<QrPayment>({
    dynamicOrImg: "",
    loading: false,
    error: "",
  });

  const [qrModal, setQrModal] = useState<boolean>(false);
  const [loading, setloading] = useState(false);

  const { cartItem, shippingDetails, voucherData, shippingFee, orderId } =
    useAppSelector((state) => state.cart);
  const carts_id = cartItem.map((item) => item.id);

  const subTotal = cartItem.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const taxAmount = cartItem.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const tax = item.tax_applied
      ? (price * item.tax_applied.tax_percentage) / 100
      : 0;
    return sum + tax;
  }, 0);

  const voucherDiscount =
    (parseFloat(voucherData?.coupon?.discount_percentage ?? "0") / 100) *
    subTotal;
  const Total =
    subTotal + (parseFloat(shippingFee) || 0) + taxAmount - voucherDiscount;

  const BUNDLE_URL = process.env.NEXT_PUBLIC_BUNDLE_URL;

  const handleDynamicQrSocket = (message: string) => {
    console.log(message, "message is the socket");
    const jsonDecodedValue = JSON.parse(message);
    const transactionStatus = JSON.parse(jsonDecodedValue["transactionStatus"]);
    const isQrVerified: boolean = transactionStatus["qrVerified"] === true;
    const paymentDone: boolean = transactionStatus["paymentSuccess"] === true;
    if (paymentDone) {
      router.push("/payment/success?status=1");
    }
    console.log(`qrVerified: ${isQrVerified}, paymentDone: ${paymentDone}`);
  };

  const getDynamicQr = useCallback(async () => {
    setQrPayment((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      const QR = new DynamicQr();
      const response = await QR.generateDynamicQR({
        amount: Total,
        remarks1: "Ultra",
        remarks2: "Beauty",
      });

      setQrPayment((prev) => ({
        ...prev,
        dynamicOrImg: response.qrMessage,
      }));

      if (response.merchantWebSocketUrl) {
        const socket = new WebSocket(response.merchantWebSocketUrl);
        socket.onmessage = (event: any) => {
          handleDynamicQrSocket(event.data);
        };
      }
    } catch (error: any) {
      setQrPayment((prev) => ({
        ...prev,
        error: error?.message || "QR generation failed",
      }));
      handleError(error, toast);
    } finally {
      setQrPayment((prev) => ({ ...prev, loading: false }));
      setloading(false);
    }
  }, [Total]);

  const handleConfirmOrder = async () => {
    setloading(true);
    const res = await addOrders({
      carts_id: carts_id,
      shipping_info: {
        first_name: shippingDetails?.firstName || "",
        last_name: shippingDetails?.lastName || "",
        email: shippingDetails?.email || "",
        phone_no: shippingDetails?.phoneNumber || "",
        alternate_phone_no: shippingDetails?.alternativePhoneNumber || "",
        address: shippingDetails?.address || "",
        province: shippingDetails?.province || "",
        city: shippingDetails?.city || "",
        landmark: shippingDetails?.landmark || "",
      },
      payment_method: activePaymentMethod || "cod",
      coupon: voucherData?.coupon ? voucherData.coupon : null,
    });
    if (res.status !== 201) {
      toast.error("Failed to place order. Please try again.");
      return;
    } else {
      toast.success("Order placed successfully!");
      dispatch(setOrderId(res.data.id));
      dispatch(decreaseCartCountBy(cartItem.length));
    }
    if (activePaymentMethod === "cod") {
      router.push("/profile");
      dispatch(clearCart());
      dispatch(setShippingFee("ß"));
    } else if (activePaymentMethod === "getpay") {
      handleMakePayment();
      return;
    } else if (activePaymentMethod === "qr") {
      setQrModal(true);
      getDynamicQr();
      return;
    }
  };

  const handleMakePayment = () => {
    if (!window.GetPay) {
      toast.error("Payment system is not ready yet.");
      return;
    }
    if (!shippingDetails || !orderId || !cartItem) {
      toast.error("Missing required details.");
      return;
    }

    const options: any = {
      userInfo: {
        name: shippingDetails?.firstName + shippingDetails?.lastName,
        email: shippingDetails.email,
        state: shippingDetails.province,
        country: "Nepal",
        city: shippingDetails.city,
        address: shippingDetails.address,
      },
      papInfo: process.env.NEXT_PUBLIC_PAP_INFO,
      oprKey: process.env.NEXT_PUBLIC_OPR_KEY,
      insKey: process.env.NEXT_PUBLIC_INS_KEY,

      websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
      price: Total,
      businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME,
      imageUrl: imageUrl,
      currency: "NPR",

      prefill: {
        name: true,
        email: true,
        state: true,
        city: true,
        address: true,
        country: true,
      },

      disableFields: {
        address: true,
        zipcode: true,
        state: true,
      },

      callbackUrl: {
        successUrl: process.env.NEXT_PUBLIC_SUCCESS_URL,
        failUrl: process.env.NEXT_PUBLIC_FAIL_URL,
      },

      themeColor: "#5662FF",
      orderInformationUI: getOrderInformationHtml(cartItem, Total),

      onSuccess: () => {
        dispatch(decreaseCartCountBy(cartItem.length));
        dispatch(clearCart());
        dispatch(setShippingFee("ß"));
        setloading(false);
        window.location.href = "/payment/make-payment";
      },
      onError: (error: any) => {
        toast.error(error?.error);
      },
    };

    options.baseUrl = process.env.NEXT_PUBLIC_PAYMENT_URL;
    const getPay = new window.GetPay(options);
    getPay.initialize();
  };

  useEffect(() => {
    if (cartItem?.length > 0) {
      const script = document.createElement("script");
      script.src = BUNDLE_URL || "";
      script.async = true;
      script.onload = () => {};
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <section className="flex flex-col h-auto gap-6 lg:gap-10 padding lg:p-8">
      {/* Section Header */}
      <SectionHeader title="Payment" description="Payment for your products" />

      <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          {/* Payment Methods */}
          <div className="bg-secondary rounded-sm">
            <p className="px-5 py-3 text-sm font-medium md:text-base">
              Select payment Methods
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-3 sm:gap-5 md:gap-4 lg:gap-3">
            {PAYMENT_GATEWAYS.map((item, index) => (
              <button
                key={index}
                onClick={() => setActivePaymentMethod(item.value)}
                className={`
                  w-full aspect-square flex flex-col gap-2 md:gap-4 justify-center items-center
                  border-[1px] rounded-sm cursor-pointer
                  ${
                    activePaymentMethod === item.value
                      ? "border-primary"
                      : "border-[#7C7C7C]"
                  }
                `}
              >
                <div className="relative w-45 h-20">
                  <Image
                    src={item.image}
                    fill
                    alt={item.name}
                    className="object-contain"
                  />
                </div>
                <p
                  className={`
                  text-center text-xs sm:text-sm md:text-base font-medium
                  ${
                    activePaymentMethod === item.value
                      ? "text-primary"
                      : "text-foreground"
                  }
                  lg:px-4
                `}
                >
                  {item.name}
                </p>
              </button>
            ))}
          </div>

          {/* Save Info Checkbox */}
          {/* <div className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <p className="text-sm md:text-base">
              Save information for future purchases
            </p>
          </div> */}

          {/* Confirm Order Box */}
          <div className="border border-[#7C7C7C] bg-[#FAFAFA] rounded-sm p-4 md:p-7 flex flex-col gap-3 md:gap-4">
            <h2 className="text-base md:text-xl font-medium text-primary">
              Confirm Order
            </h2>
            <ol className="pl-4 list-decimal text-sm sm:text-base font-medium space-y-1">
              <li>
                Your order will be created once you click <b>Confirm Order</b>.
              </li>
              <li>
                Please ensure your chosen wallet has enough balance before
                proceeding.
              </li>
              <li>
                If you select Esewa/Khalti and don’t complete payment, your
                order will show as <b>Pending Payment</b> in your profile.
              </li>
            </ol>
            <div id="checkout" hidden></div>

            <Button
              variant="default"
              size="default"
              onClick={handleConfirmOrder}
              disabled={activePaymentMethod === null || loading}
              className="mt-4 py-4 md:py-3 text-sm md:text-base lg:text-lg font-medium text-white text-center rounded-full bg-primary"
            >
              {loading ? <Spinner /> : "Confirm Order"}
            </Button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <OrderSummary
            shippingDetails={shippingDetails}
            shippingFee={shippingFee as any}
            totalItems={cartItem.length}
            applyVoucher={false}
            isCheckout
          />
        </div>
        <QrPaymentModal
          isOpen={qrModal}
          setIsOpen={setQrModal}
          qrPayment={qrPayment}
        />
      </div>
    </section>
  );
};

export default Payment;
