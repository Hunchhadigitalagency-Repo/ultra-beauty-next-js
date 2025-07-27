'use client'

import RatingStars from '@/components/common/product/rating-stars'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface OrderProductProps {
    imageSrc: string
    alt: string
    title: string
    description: string
    rating: number
    price: number
    quantity: number
}

const OrderProduct: React.FC<OrderProductProps> = ({
    imageSrc,
    alt,
    title,
    description,
    rating,
    price,
    quantity,
}) => {
    return (
        <section className="w-full md:w-1/3 bg-white rounded-lg overflow-hidden shadow">
            <div className="relative mb-4 h-[300px] sm:h-[250px] overflow-hidden rounded-lg group cursor-pointer">
                <Image
                    src={imageSrc}
                    alt={alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">
                        Flash Sale
                    </span>
                </div>

                <div className="absolute top-3 right-3">
                    <span className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded">
                        New
                    </span>
                </div>
            </div>

            <div className="px-4 pb-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-orange">{title}</h3>
                <p className="text-foreground text-sm leading-relaxed line-clamp-2 text-ellipsis">
                    {description}
                </p>

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

                <div className="flex justify-between items-center mt-2">
                    <span className="text-base font-semibold text-black">
                        Rs. {price}
                    </span>
                    <div className="border border-gray-500 px-2 py-0.5 rounded text-sm ">
                        Quantity: {quantity || 10}
                    </div>                </div>

                <button className="mt-3 w-full py-2 px-4 text-sm bg-orange text-white rounded hover:bg-orange/90 transition">
                    Write a Review
                </button>
            </div>
        </section>
    )
}

export default OrderProduct