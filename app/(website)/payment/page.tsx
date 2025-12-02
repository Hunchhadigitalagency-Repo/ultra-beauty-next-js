"use client"
import Image from 'next/image';
import { toast } from 'sonner';
// import Esewa from '@/assets/esewa.png';
import React, { useEffect, useState } from 'react';
// import Khalti from '@/assets/khalti.png';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { addOrders } from '@/lib/api/order/order-apis';
import CashOnDelivery from '@/assets/cash-on-delivery.png';
import GetPay from '@/assets/getpay.jpeg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SectionHeader from '@/components/common/header/section-header';

import OrderSummary from '@/app/(website)/cart/components/order-summary';
import { clearCart, decreaseCartCountBy, setOrderId, setShippingFee } from '@/redux/features/cart-slice';
import { getOrderInformationHtml } from './components/get-order-html';


const PAYMENT_GATEWAYS = [
  { name: 'Cash on Delivery', image: CashOnDelivery, value: 'cod' },
  { name: 'Get Pay (Card)', image: GetPay, value: 'getpay' },
];


const Payment: React.FunctionComponent = () => {


  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(null);
  const [makePayment, setMakePayment] = useState(false)

  const { cartItem, shippingDetails, voucherData, shippingFee, orderId } = useAppSelector(state => state.cart);
  const carts_id = cartItem.map(item => item.id);

  const subTotal = cartItem.reduce((sum, item) => sum + (parseFloat(item.price)), 0);
  const taxAmount = cartItem.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const tax = item.tax_applied ? (price * item.tax_applied.tax_percentage) / 100 : 0;
    return sum + tax;
  }, 0);

  const voucherDiscount = parseFloat(voucherData?.coupon?.discount_percentage ?? "0") / 100 * subTotal;
  const Total = subTotal + (parseFloat(shippingFee) || 0) + taxAmount - voucherDiscount;

  console.log(cartItem);
  const BUNDLE_URL = process.env.NEXT_PUBLIC_BUNDLE_URL;



  const handleConfirmOrder = async () => {
    const res = await addOrders({
      carts_id: carts_id,
      shipping_info: {
        first_name: shippingDetails?.firstName || '',
        last_name: shippingDetails?.lastName || '',
        email: shippingDetails?.email || '',
        phone_no: shippingDetails?.phoneNumber || '',
        alternate_phone_no: shippingDetails?.alternativePhoneNumber || '',
        address: shippingDetails?.address || '',
        province: shippingDetails?.province || '',
        city: shippingDetails?.city || '',
        landmark: shippingDetails?.landmark || '',
        building: shippingDetails?.buildingAddress || '',
      },
      payment_method: activePaymentMethod || 'cod',
      coupon: voucherData?.coupon ? voucherData.coupon : null
    })
    if (res.status !== 201) {
      toast.error("Failed to place order. Please try again.");
      return;
    } else {
      toast.success("Order placed successfully!");
      dispatch(setOrderId(res.data.id));
    }
    if (activePaymentMethod === 'cod') {
      router.push('/profile');
      dispatch(decreaseCartCountBy(cartItem.length));
      dispatch(clearCart());
      dispatch(setShippingFee('ß'))
    } else if (activePaymentMethod === 'getpay') {
      setMakePayment(true)
    } else if (activePaymentMethod === 'khalti') {
      toast.error("Khalti payment method is not implemented yet.");
    }
  }

  const handleMakePayment = () => {
    if (!window.GetPay) {
      toast.error("Payment system is not ready yet.");
      return;
    }
    if(!shippingDetails || !orderId || !cartItem){
      toast.error("Missing required details.");
      return;
    }

    const options: any = {
      userInfo: {
        name: shippingDetails?.firstName +  shippingDetails?.lastName,
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
      imageUrl: process.env.NEXT_PUBLIC_LOGO_URL,
      currency: "NPR",

      prefill: {
        name: true,
        email: true,
        state: true,
        city: true,
        address: true,
        country: true
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
        dispatch(setShippingFee('ß'))
        window.location.href = '/payment/make-payment'
      },
      onError: (error: any) => {
        toast.error(error?.error);
        console.log("Error details:", error);
      },
    };

    options.baseUrl = process.env.NEXT_PUBLIC_PAYMENT_URL
    const getPay = new window.GetPay(options);
    getPay.initialize();
  }

  useEffect(() => {
    if (cartItem?.length > 0) {
      const script = document.createElement('script');
      script.src = BUNDLE_URL || '';
      script.async = true;
      script.onload = () => console.log('GetPay script loaded successfully');
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);


  return (
    <section className="flex flex-col h-auto gap-6 lg:gap-10 padding lg:p-8">
      {/* Section Header */}
      <SectionHeader
        title="Payment"
        description="Payment for your products"
      />

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
                  ${activePaymentMethod === item.value ? "border-primary" : "border-[#7C7C7C]"}
                `}
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    fill
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <p className={`
                  text-center text-xs sm:text-sm md:text-base font-medium
                  ${activePaymentMethod === item.value ? "text-primary" : "text-foreground"}
                  lg:px-4
                `}>
                  {item.name}
                </p>
              </button>
            ))}
          </div>

          {/* Save Info Checkbox */}
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <p className="text-sm md:text-base">Save information for future purchases</p>
          </div>

          {/* Confirm Order Box */}
          <div className="border border-[#7C7C7C] bg-[#FAFAFA] rounded-sm p-4 md:p-7 flex flex-col gap-3 md:gap-4">
            <h2 className="text-base md:text-xl font-medium text-primary">
              Confirm Order
            </h2>
            <ol className="pl-4 list-decimal text-sm sm:text-base font-medium space-y-1">
              <li>Your order will be created once you click <b>Confirm Order</b>.</li>
              <li>Please ensure your chosen wallet has enough balance before proceeding.</li>
              <li>If you select Esewa/Khalti and don’t complete payment, your order will show as <b>Pending Payment</b> in your profile.</li>
            </ol>
            <div id="checkout" hidden></div>
            {
              !makePayment ?
                <Button
                  variant="default"
                  size="default"
                  onClick={handleConfirmOrder}
                  disabled={activePaymentMethod === null}
                  className="mt-4 py-4 md:py-3 text-sm md:text-base lg:text-lg font-medium text-white text-center rounded-full bg-primary"
                >
                  Confirm Order
                </Button>
                :
                <Button
                  id="checkout-btn"
                  variant="default"
                  size="default"
                  onClick={handleMakePayment}
                  disabled={!makePayment}
                  className="mt-4 py-4 md:py-3 text-sm md:text-base lg:text-lg font-medium text-white text-center rounded-full bg-primary"
                >
                  Make Payment
                </Button>
            }
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
      </div>
    </section>
  )
}

export default Payment