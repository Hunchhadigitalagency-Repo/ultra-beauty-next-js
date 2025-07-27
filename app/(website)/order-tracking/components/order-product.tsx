'use client'

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import RatingStars from '@/components/common/product/rating-stars';
import SectionHeader from '@/components/common/header/section-header';

interface OrderProductProps {
    imageSrc: string
    alt: string
    title: string
    description: string
    rating: number
    price: number
    quantity: number;
    date: string;
}

const OrderProduct: React.FunctionComponent<OrderProductProps> = ({
    imageSrc,
    alt,
    title,
    description,
    rating,
    price,
    quantity,
    date
}) => {

    return (
        <section className="w-full flex flex-col lg:flex-row gap-5 rounded-lg overflow-hidden">
            {/* Image Section */}
            <div className="relative w-full lg:w-[200px] mb-4 h-[250px] md:h-[300px] lg:h-[180px] border overflow-hidden rounded-lg group cursor-pointer">
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-1 right-1">
                    <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                        New
                    </span>
                </div>
            </div>
            {/* Content Section */}
            <div className="px-4 pb-4 flex flex-col gap-2 w-full">
                <div className='flex gap-2 justify-between items-center'>
                    <div className=" border border-gray-500 px-2 py-0.5 rounded text-sm ">
                        Quantity: {quantity}
                    </div>
                    <div className=" border border-gray-500 px-2 py-0.5 rounded text-sm ">
                        Date: {date}
                    </div>
                    <div className=" border border-gray-500 px-2 py-0.5 rounded text-sm ">
                        Price: {price}
                    </div>
                </div>
                <SectionHeader
                    title={title}
                    description={description}
                    titleClassName='text-xl xl:text-2xl'
                />
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                        <RatingStars rating={rating} />
                        <span className="text-foreground font-medium">
                            {rating.toFixed(1)}
                        </span>
                    </div>

                    <button
                        className="p-1 rounded-full text-gray-400 hover:text-orange transition-colors"
                        aria-label="Toggle Wishlist"
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
                {/* Button */}
                <button className="mt-3 w-full py-2 px-4 text-sm bg-primary text-white rounded cursor-pointer">
                    Write a Review
                </button>
            </div>
        </section>
    )
}

export default OrderProduct