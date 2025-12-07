"use client";
import { CreateOrderResponse } from '@/types/orders';
import React from 'react';

interface OrderPaymentProps {
  paymentdetails: CreateOrderResponse | null;
}

const OrderPayment: React.FC<OrderPaymentProps> = ({ paymentdetails }) => {
  return (
    <div className="space-y-8">
      <div className="padding w-full md:min-h-96 bg-secondary grid xl:grid-cols-2 gap-4 pt-6 rounded-md">

        {/* Shipping Info */}
        <div className="px-6 py-5 w-full bg-white flex flex-col gap-2 md:gap-3 rounded-md shadow-sm">
          <h2 className="font-poppins font-semibold text-base md:text-lg text-custom-black">
            {paymentdetails?.user.first_name} {paymentdetails?.user.last_name}
          </h2>

          <p className="text-sm md:text-base text-gray-700">
            {paymentdetails?.shipping_info.address}
          </p>

          <div className="text-sm md:text-base text-gray-700 flex flex-col gap-1">
            <span>{paymentdetails?.shipping_info.email}</span>
            <span>{paymentdetails?.shipping_info.phone_no}</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="px-6 py-5 w-full bg-white rounded-md shadow-sm">
          <h2 className="font-poppins font-semibold text-base md:text-lg text-primary mb-4">
            Total Summary
          </h2>

          <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-800">
            <SummaryRow label="Total Items" value={paymentdetails?.order_details.length ?? 0} />

            <SummaryRow label="Sub Total" value={paymentdetails?.sub_total} />

            {Number(paymentdetails?.discount_amount ?? 0) > 0 && (
              <SummaryRow label="Discount Amount" value={paymentdetails?.discount_amount} highlight />
            )}

            {Number(paymentdetails?.tax_amount ?? 0) > 0 && (
              <SummaryRow label="Tax Amount" value={paymentdetails?.tax_amount} />
            )}

            {Number(paymentdetails?.coupon_discount ?? 0) > 0 && (
              <SummaryRow label="Coupon Discount" value={paymentdetails?.coupon_discount} />
            )}

            {Number(paymentdetails?.shipping_fee ?? 0) > 0 && (
              <SummaryRow label="Shipping Fee" value={paymentdetails?.shipping_fee} />
            )}
          </div>

          {/* Total */}
          <div className="pt-5 mt-4 border-t border-gray-300 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="font-poppins font-medium text-sm md:text-base text-gray-700">
                Total
              </h3>
              <h3 className="font-poppins font-semibold text-lg md:text-xl text-primary">
                {paymentdetails?.total_amount}
              </h3>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 font-poppins">
              <span>Paid by {paymentdetails?.payment_method}</span>
              <span>All Tax Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
  highlight?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className="font-poppins font-medium text-gray-700 text-sm md:text-base">
      {label}
    </span>
    <span
      className={`font-poppins font-medium text-sm md:text-base `}
    >
      {value}
    </span>
  </div>
);

export default OrderPayment;
