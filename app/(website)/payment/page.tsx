"use client"
import Image from 'next/image';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
// import Esewa from '@/assets/esewa.png';
import React, { useState } from 'react';
// import Khalti from '@/assets/khalti.png';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { addOrders } from '@/lib/api/order/order-apis';
import CashOnDelivery from '@/assets/cash-on-delivery.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SectionHeader from '@/components/common/header/section-header';
import { generateEsewaPayload } from '@/lib/api/payment/payment-apis';
import OrderSummary from '@/app/(website)/cart/components/order-summary';
import { clearCart, decreaseCartCountBy, setOrderId, setShippingFee } from '@/redux/features/cart-slice';


const PAYMENT_GATEWAYS = [
  { name: 'Cash on Delivery', image: CashOnDelivery, value: 'cod' },
  // { name: 'Esewa', image: Esewa, value: 'esewa' },
  // { name: 'Khalti', image: Khalti, value: 'khalti' },
];


const Payment: React.FunctionComponent = () => {

  const shippingFee = 150

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(null);
  const { cartItem, shippingDetails, voucherData } = useAppSelector(state => state.cart);
  const carts_id = cartItem.map(item => item.id);

  const subTotal = cartItem.reduce((sum, item) => sum + (parseFloat(item.price)), 0);
  const taxAmount = cartItem.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const tax = item.tax_applied ? (price * item.tax_applied.tax_percentage) / 100 : 0;
    return sum + tax;
  }, 0);

  const voucherDiscount = parseFloat(voucherData?.coupon?.discount_percentage ?? "0") / 100 * subTotal;
  const Total = subTotal + shippingFee + taxAmount - voucherDiscount;

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
    } else if (activePaymentMethod === 'esewa') {

      try {
        const transactionId = uuidv4();
        const product_code = "EPAYTEST";

        const paymentData = await generateEsewaPayload(
          Total,
          transactionId,
          product_code,
        );

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.entries(paymentData).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        }
        );
        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error("Error generating Esewa payload:", error);
        toast.error("Failed to initiate Esewa payment. Please try again.");
      }
    } else if (activePaymentMethod === 'khalti') {
      toast.error("Khalti payment method is not implemented yet.");
    }
  }

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

            <Button
              variant="default"
              size="default"
              onClick={handleConfirmOrder}
              disabled={activePaymentMethod === null}
              className="mt-4 py-4 md:py-3 text-sm md:text-base lg:text-lg font-medium text-white text-center rounded-full bg-primary"
            >
              Confirm Order
            </Button>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div>
          <OrderSummary
            shippingDetails={shippingDetails}
            shippingFee={shippingFee}
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