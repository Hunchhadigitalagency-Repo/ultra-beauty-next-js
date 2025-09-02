"use client"
import Image from 'next/image';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import Esewa from '@/assets/esewa.png';
import React, { useState } from 'react';
import Khalti from '@/assets/khalti.png';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { addOrders } from '@/lib/api/order/order-apis';
import CashOnDelivery from '@/assets/cash-on-delivery.png';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SectionHeader from '@/components/common/header/section-header';
import { generateEsewaPayload } from '@/lib/api/payment/payment-apis';
import OrderSummary from '@/app/(website)/cart/components/order-summary';
import { clearCart, decreaseCartCountBy, setOrderId } from '@/redux/features/cart-slice';


const PAYMENT_GATEWAYS = [
  { name: 'Esewa', image: Esewa, value: 'esewa' },
  { name: 'Khalti', image: Khalti, value: 'khalti' },
  { name: 'Cash on Delivery', image: CashOnDelivery, value: 'cod' },
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
    <section className="flex flex-col h-auto gap-5 padding lg:gap-10">
      <SectionHeader
        title="Payment"
        description="Payment for your products"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-10 lg:gap-x-25">
        <OrderSummary
          shippingDetails={shippingDetails}
          shippingFee={shippingFee}
          totalItems={cartItem.length}
          applyVoucher={false}
          isCheckout
        />
        <div className="flex flex-col order-1 gap-3 md:gap-5 lg:order-none ">
          <div className="bg-[#FAFAFA] rounded-sm">
            <p className="px-5 py-3 text-sm font-medium md:text-base">
              Select payment Methods
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 sm:gap-5 md:gap-10">
            {
              PAYMENT_GATEWAYS.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActivePaymentMethod(item.value)}
                  className={`
                    w-full aspect-square cursor-pointer flex flex-col gap-2 md:gap-4
                    justify-center items-center border-[1px] rounded-sm 
                    ${activePaymentMethod === item.value
                      ? "border-primary"
                      : "border-[#7C7C7C]"
                    }
                `}
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      fill
                      alt={item.name}
                      className="object-cover h-0"
                    />
                  </div>
                  <p
                    className={`
                  text-center text-xs sm:text-sm md:text-base font-medium
                  ${activePaymentMethod === item.value && "text-primary"}
                  `}
                  >
                    {item.name}
                  </p>
                </button>
              ))
            }
          </div>
          <div className='flex gap-4 '><input type="checkbox" className='w-5 h-5' /> <span> <p>Save information for future purchases</p></span></div>
          <div className="border-[1px] border-[#7C7C7C] bg-[#FAFAFA] p-3 md:p-7 rounded-sm flex flex-col gap-2 md:gap-4 order-3 lg:order-none ">
            <h2 className='text-base font-medium text-primary md:text-xl'>Confirm Order</h2>
            <ol className="pl-3 text-sm font-medium list-decimal sm:text-base">
              <li>Your order will be created once you click <b>Confirm Order</b>.</li>
              <li>Please ensure your chosen wallet has enough balance before proceeding.</li>
              <li>If you select Esewa/Khalti and don’t complete payment, your order will show as <b>Pending Payment</b> in your profile.</li>
            </ol>

            <Button
              variant={'default'}
              size={'default'}
              onClick={handleConfirmOrder}
              disabled={activePaymentMethod === null}
              className='py-4 text-sm font-medium text-center text-white rounded-full cursor-pointer bg-primary md:text-base lg:text-lg md:py-3'>
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Payment