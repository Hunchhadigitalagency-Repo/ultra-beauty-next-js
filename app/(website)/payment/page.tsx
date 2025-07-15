"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Esewa from '@/assets/esewa.png';
import Khalti from '@/assets/khalti.png';
import SectionHeader from '@/components/common/header/section-header';


const PAYMENT_GATEWAYS = [
    { name: 'Esewa', image: Esewa, value: 'esewa' },
    { name: 'Khalti', image: Khalti, value: 'khalti' },
    { name: 'Cash on Delivery', image: Khalti, value: 'cod' },
];


const Payment = () => {

    const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(null)

    return (
        <section className="px-6 lg:px-14 py-8 flex flex-col gap-5 lg:gap-10">
            <SectionHeader
                title="Payment"
                description="Purchase the item from here"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-10">
                <div className="flex flex-col gap-3 md:gap-5">
                    <div className="bg-[#EBEBEB] rounded-sm">
                        <p className="px-5 py-3 font-medium text-sm md:text-base">
                            Select payment Methods
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-10">
                        {PAYMENT_GATEWAYS.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActivePaymentMethod(item.value)}
                                className={`
                                    w-full cursor-pointer flex flex-col py-3 md:py-10 gap-2 md:gap-4
                                    justify-center items-center border-[1px] rounded-sm
                                    ${activePaymentMethod === item.value
                                        ? "border-[#FF9900]"
                                        : "border-[#7C7C7C]"
                                    }
                `}
                            >
                                <div className="w-10 h-10 md:w-20 md:h-20 relative">
                                    <Image
                                        src={item.image}
                                        layout="fill"
                                        alt={item.name}
                                        className="object-cover"
                                    />
                                </div>
                                <p
                                    className={`
                                        text-center text-xs sm:text-sm md:text-base font-medium
                                        ${activePaymentMethod === item.value && "text-[#FF9900]"}
                                        `}
                                >
                                    {item.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-6 bg-[#EFEFEF] md:bg-inherit px-4 md:px-0 py-6 md:py-0 rounded-sm'>
                    <h1 className=" text-sm md:text-base lg:text-xl font-medium text-[#1477B4]">
                        Order Summary
                    </h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center font-medium text-sm md:text-base'>
                            <p>Total Item</p>
                            <p>2</p>
                        </div>
                        <div className='flex justify-between items-center font-medium text-sm md:text-base'>
                            <p>Sub Total</p>
                            <p>Nrs. 546798.89</p>
                        </div>
                        <div className='flex justify-between items-center font-medium text-sm md:text-base'>
                            <p>Sheeping fee</p>
                            <p>Nrs. 250</p>
                        </div>
                        <div className='flex justify-between items-center mt-2 font-semibold'>
                            <p>Total</p>
                            <div className='flex flex-col items-end'>
                                <p className='font-semibold text-[#FF9900] text-sm md:text-base'>Nrs. 5486459.25</p>
                                <p className='text-xs sm:text-sm md:text-base font-normal text-[#6F6F6F]'>All Tax Undefined</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-[#7C7C7C] p-3 md:p-7 rounded-sm flex flex-col gap-2 md:gap-4">
                    <h2 className='font-medium text-[#1477B4] text-base md:text-xl'>Confirm Order</h2>
                    <ol className='list-decimal pl-3 text-sm sm:text-base font-medium'>
                        <li>Here will be some information regarding the payment </li>
                        <li>here wolll be another information regarding the payment</li>
                        <li>here will be other info</li>
                    </ol>
                    <button className='bg-[#40C040] text-white text-sm md:text-base lg:text-xl font-medium py-2 md:py-3 text-center'>
                        Confirm Order
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Payment