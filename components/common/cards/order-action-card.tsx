'use client'
import React from 'react';
import Image from 'next/image';
import CancelOrderImage from "@/assets/Rectangle976.png";
import SectionHeader from '@/components/common/header/section-header';

interface Product {
    date: string;
    quantity: number;
    price: number;
    size: string;
    weight: string;
    color: string;
    total: number;
    title: string;
    image: string;
    descrption: string;
}

interface ActionCardProps {
    product: Product
}

const propertiesToDisplay = [
    { key: 'date', label: 'Date' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'size', label: 'Size' },
    { key: 'weight', label: 'Weight' },
    { key: 'color', label: 'Color' },
    { key: 'price', label: 'Price' },
];
const OrderActionCard: React.FunctionComponent<ActionCardProps> = ({ product }) => {

    return (
        <div className='w-full bg-white min-h-56 md:min-h-56 xl:min-h-[80%]'>
            <div className=" relative flex flex-row  items-start md:items-start gap-2 p-2 md:gap-4 md:p-4 w-full">
                {/* Product Image */}
                <div className="relative flex-shrink-0 w-28 h-28 md:w-48 md:h-56  rounded-lg overflow-hidden">
                    <Image
                        src={CancelOrderImage || "/placeholder.svg"}
                        alt={""}
                        layout='fill'
                        className="object-cover"
                    />
                </div>
                <div className='py-2 md:py-5 w-full'>
                    <SectionHeader
                        titleClassName="font-playfair font-bold  text-base sm:text-xl md:text2xl"
                        descriptionClassName="font-poppins text-xs md:text-sm"
                        title="Sensanori Vitamin Cream for Anti-aging"
                        description="A product that helps to reduce wrinkles and makes skin glowing."
                    />
                    {/* Info Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-[85%_15%] py-0 md:py-1.5 text-xs font-poppins w-full">
                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1 md:gap-1.5 py-3 lg:font-semibold w-full'>
                            {
                                propertiesToDisplay.map(({ key, label }) => (
                                    <div key={key} className="border border-gray-500 px-1 py-1 md:px-2 text-xs md:text-sm md:py-2 rounded-sm">
                                        {label}:{product[key as keyof Product]}
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex flex-col w-full items-center">
                            <h1 className="text-sm md:text-sm lg:text-xl font-poppins font-medium">
                                Total
                            </h1>
                            <h1 className="text-primary text-sm md:text-xl font-poppins font-semibold">
                                NRS. {product.total}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderActionCard