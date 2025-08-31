import { CreateOrderResponse } from '@/types/orders';
import React from 'react';


interface OrderPaymentProps {
    paymentdetails: CreateOrderResponse | null;
}
const OrderPayment: React.FunctionComponent<OrderPaymentProps> = ({ paymentdetails }) => {

    return (
        <div className='space-y-8'>
            <div className='padding w-full md:min-h-96  bg-secondary flex-col grid xl:grid-cols-2 gap-3 pt-7 rounded-md'>
                <div className='px-4  py-5  w-full h-34 md:h-44 bg-white flex flex-col gap-2 md:gap-3 rounded-md'>
                    <h1 className='font-poppins font-medium text-sm md:text-xl'>
                        {paymentdetails?.user.first_name} {paymentdetails?.user.last_name}
                    </h1>
                    <div className='flex gap-3 items-center'>

                        <h1 className='font-poppins font-medium text-xs md:text-base'>
                            {paymentdetails?.shipping_info.address}
                        </h1>
                    </div>
                    <h1 className='font-poppins font-medium text-sm text-cente md:text-base'>
                        {paymentdetails?.shipping_info.email}
                    </h1>
                    <h1 className='font-poppins font-medium text-sm text-cente md:text-base'>
                        {paymentdetails?.shipping_info.phone_no}
                    </h1>
                </div>
                <div className="px-7 py-5 w-ful h-64 md:h-96 bg-white rounded-md">
                    <div className='flex flex-col gap-1 md:gap-3'>
                        <h1 className="font-poppins font-medium text-primary text-sm md:text-xl">Total Summary</h1>
                        <div className='flex justify-between text-sm md:text-xl font-poppins font-medium'>
                            <h1>
                                Total Item
                            </h1>
                            <h1>
                                {paymentdetails?.order_details.length}
                            </h1>
                        </div>

                        <div className='flex justify-between text-sm md:text-xl font-poppins font-medium'>
                            <h1 className='font-poppins font-medium'>Sub Total</h1>
                            <h1>{paymentdetails?.sub_total}</h1>
                        </div>
                        {Number(paymentdetails?.discount_amount ?? 0) > 0 && (
                            <div className='flex justify-between text-sm md:text-xl font-poppins font-medium'>
                                <h1 className='font-poppins font-medium'>Discount Amount</h1>
                                <h1>{paymentdetails?.discount_amount}</h1>
                            </div>
                        )}

                        {Number(paymentdetails?.tax_amount ?? 0) > 0 && (
                            <div className='flex justify-between text-sm md:text-xl font-poppins font-medium'>
                                <h1 className='font-poppins font-medium'>Tax Amount</h1>
                                <h1>{paymentdetails?.tax_amount}</h1>
                            </div>
                        )}

                        {Number(paymentdetails?.coupon_discount ?? 0) > 0 && (
                            <div className="flex justify-between text-sm md:text-xl font-poppins font-medium">
                                <h1 className="font-poppins font-medium">Coupon Discount</h1>
                                <h1>{paymentdetails?.coupon_discount}</h1>
                            </div>
                        )}
                        {Number(paymentdetails?.shipping_fee ?? 0) > 0 && (<div className='flex justify-between text-sm md:text-xl font-poppins font-medium'>
                            <h1 className='font-poppins font-medium'>Shipping fee</h1>
                            <h1>{paymentdetails?.shipping_fee}</h1>
                        </div>)}

                    </div>
                    <div className='pt-5 border-t flex text-sm md:text-xl flex-col gap-2'>
                        <div className='flex justify-between'>
                            <h1 className='font-poppins font-medium'>Total</h1>
                            <h1 className='font-poppins font-semibold text-sm md:text-xl text-primary'>{paymentdetails?.total_amount}</h1>
                        </div>
                        <div className='font-poppins text-[#6F6F6F] text-xs md:text-sm flex justify-between'>
                            <h1>
                                Paid by {paymentdetails?.payment_method}
                            </h1>
                            <h1>All Tax Included</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPayment