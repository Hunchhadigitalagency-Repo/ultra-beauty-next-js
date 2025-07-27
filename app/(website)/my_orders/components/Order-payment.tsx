import React from 'react';

const OrderPayment = () => {
    return (
        <div className='space-y-8'>
            <div className='px-10 w-full h-80 bg-[#FFEBED] grid grid-cols-2 gap-3 pt-7 rounded-md'>
                <div className='px-7 py-5 w-ful h-36 bg-white flex flex-col gap-3 rounded-md'>
                    <h1 className='font-poppins font-medium text-sm md:text-xl'>
                        Hemanta Jung karki
                    </h1>
                    <div className='flex gap-3 items-center'>
                        <button className='bg-primary font-medium text-sm text-white rounded-full w-24 h-6 flex justify-center items-center'>
                            HOME
                        </button>
                        <h1 className='font-poppins font-medium text-sm'>
                            Itahari, Khetikhola, Nepal
                        </h1>
                    </div>
                    <h1 className='font-poppins font-medium text-sm'>
                        9800000000
                    </h1>
                </div>
                <div className="px-7 py-5 w-ful h-64 bg-white rounded-md">
                    <div className='flex flex-col gap-3'>
                        <h1 className="font-poppins font-medium text-primary text-sm md:text-xl">Total Summary</h1>
                        <div className='flex justify-between font-poppins font-medium'>
                            <h1>
                                Total Item
                            </h1>
                            <h1>
                                2
                            </h1>
                        </div>
                        <div className='flex justify-between font-poppins font-medium'>
                        <h1 className='font-poppins font-medium'>Sub Total</h1>
                            <h1>NRS.45000</h1>
                        </div>
                        <div className='flex justify-between font-poppins font-medium'>
                        <h1 className='font-poppins font-medium'>Shipping fee</h1>
                        <h1>NRS.250</h1>
                        </div>
                    </div>
                    <div className='pt-5 border-t flex flex-col gap-2'>
                        <div className='flex justify-between'>
                        <h1 className='font-poppins font-medium'>Total</h1>
                        <h1 className='font-poppins font-semibold text-sm md:text-xl text-primary'>NRS.45250</h1>
                        </div>
                        <div className='font-poppins text-[#6F6F6F] text-xs md:text-sm flex justify-between'>
                        <h1>
                            Paid by Cash On Delivery
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