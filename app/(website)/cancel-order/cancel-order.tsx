import React from 'react';
import Image from 'next/image';
import CancelOrderImage from "@/assets/Rectangle976.png"
import SectionHeader from '@/components/common/header/section-header';

interface CancelOrderProps{
    date:string;
    quantity:number;
    price:number;
    size: string;
    weight: string;
    color:string;
    total:number;

}

const CancelOrderPage:React.FunctionComponent<CancelOrderProps> = ({date, quantity, price, size, weight, color,total}) => {

    return (
        <div className='w-full bg-white h-40 md:h-52'>
            <div className=" relative flex flex-row  items-start md:items-start gap-2 p-2 md:gap-4 md:p-4">
                {/* Product Image */}
                <div className="relative flex items-center flex-shrink-0 w-24 h-24 md:w-44 md:h-44 rounded-lg overflow-hidden">
                    <Image
                        src={CancelOrderImage || "/placeholder.svg"}
                        alt={""}
                        height={96}
                        width={96}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className='py-2 md:py-5'>
                    <SectionHeader
                        titleClassName="font-playfair font-bold text-base md:text2xl"
                        descriptionClassName="font-poppins text-xs md:text-sm"
                        title="Sensanori Vitamin Cream for Anti-aging"
                        description="A product that helps to reduce wrinkles and makes skin glowing."
                    />
                    {/* View order button */}
                    <div className='block md:hidden absolute right-2'>
                        <button className='text-white bg-primary py-1 px-3 rounded-sm'>View Order</button>
                    </div>

                    {/* Section header Below components */}
                    <div className='hidden md:block'>
                        <div className="absolute py-10 flex justify-between gap-12">
                            <div className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                                Date:{date}
                            </div>
                            <div
                                className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                                Quantity: {quantity}

                            </div>
                            <div className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                                Nrs. {price}
                            </div>
                            <div className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                                Size:{size}
                            </div>
                            <div
                                className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                                weight: {weight}

                            </div>
                            <div className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                                color: {color}
                            </div>
                        </div>
                        <div className='flex flex-col absolute right-10 bottom-9'>
                            <h1 className='font-poppins text-sm'>
                                Total
                            </h1>
                            <h1 className='text-primary text-xl font-poppins font-semibold'>
                                NRS.{total}
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CancelOrderPage