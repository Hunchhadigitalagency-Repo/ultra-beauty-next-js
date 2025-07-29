"use client"
import Image from 'next/image';
import Esewa from '@/assets/esewa.png';
import React, { useState } from 'react';
import Khalti from '@/assets/khalti.png';
import GlobalIme from '@/assets/global-bank.png';
import MasterCard from '@/assets/master-card.png';
import CashOnDelivery from '@/assets/cash-on-delivery.png';
import SectionHeader from '@/components/common/header/section-header';


const PAYMENT_GATEWAYS = [
    { name: 'Esewa', image: Esewa, value: 'esewa' },
    { name: 'Khalti', image: Khalti, value: 'khalti' },
    { name: 'Cash on Delivery', image: CashOnDelivery, value: 'cod' },
    { name: "Global Bank", image: GlobalIme, value: 'GlobalIme' },
    { name: "Master Card", image: MasterCard, value: "MasterCard" }
];


const Unpaid: React.FunctionComponent = () => {

    const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(null)

    return (
        <section className="padding flex flex-col gap-5 lg:gap-10 h-auto">
            <SectionHeader
                title="Payment"
                description="Payment for your products"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_0.3fr] gap-10">
                <div className="flex flex-col gap-3 md:gap-5">
                    <div className="bg-secondary rounded-sm">
                        <p className="px-5 py-3 font-medium text-sm md:text-base">
                            Select payment Methods
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-10">
                        {PAYMENT_GATEWAYS.map((item, index) => (
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
                                <div className="w-20 h-20 relative">
                                    <Image
                                        src={item.image}
                                        layout="fill"
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
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-6 bg-[#EFEFEF] md:bg-inherit px-4 md:px-0 py-6 md:py-0 rounded-sm'>
                    <h1 className=" text-sm md:text-base lg:text-xl font-medium text-primary">
                        Order Summary
                    </h1>
                    <div className='flex flex-col gap-2 border-t'>
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
                        <div className='flex justify-between items-center mt-2 font-semibold border-t'>
                            <p>Total</p>
                            <div className='flex flex-col items-end'>
                                <p className='font-semibold text-primary text-sm md:text-base'>Nrs. 5486459.25</p>
                                <p className='text-xs sm:text-sm md:text-base font-normal text-[#6F6F6F]'>All Tax Undefined</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-[#7C7C7C] p-3 md:p-7 rounded-sm flex flex-col gap-2 md:gap-4">
                    <h2 className='font-medium text-primary text-base md:text-xl'>Confirm Order</h2>
                    <ol className='list-decimal pl-3 text-sm sm:text-base font-medium'>
                        <li>Here will be some information regarding the payment </li>
                        <li>here wolll be another information regarding the payment</li>
                        <li>here will be other info</li>
                    </ol>
                    <button className='bg-primary text-white text-sm md:text-base lg:text-xl font-medium py-2 md:py-3 text-center'>
                        Confirm Order
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Unpaid