"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface OrderProductProps {
    item: any;
}

const OrderProductDetails = ({ item }: OrderProductProps) => {
    return (
        <div className="relative flex flex-row justify-between items-start md:items-center gap-2 p-2 md:gap-4 md:p-4 rounded-lg bg-white border border-gray-200 top-2">
            {/* Product Image */}
            <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    height={96}
                    width={96}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Quantity, Info, Price, Buttons */}
            <div className="flex flex-col md:flex-row gap-4 flex-1 md:items-center md:justify-between w-full mt-1">
                {/* Quantity + Info */}
                <div className="flex flex-col md:mt-2 mt-8">
                    <h3 className="font-medium text-sm md:text-base text-gray-900 leading-snug line-clamp-2">
                        {item.name || "Sleek Pregnancy Cushion with some random text"}
                    </h3>
                    <h3 className="font-medium md:block hidden text-sm md:text-base text-gray-900 leading-snug line-clamp-2">
                        {item.name || "Sleek Pregnancy Cushion with some random text"}
                    </h3>
                </div>
                <div className="text-base md:text-lg font-semibold text-gray-900 whitespace-nowrap">
                    Nrs. {item.price || "45,000"}
                </div>

                {/* Price + Buttons */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 min-w-[180px] w-full md:w-auto">
                    {/* Price + Buttons in a single row on small screens */}
                    <div className="flex items-center gap-2 w-full flex-wrap sm:flex-nowrap">
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 text-[12px] md:text-sm whitespace-nowrap"
                        >
                            Write Review
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-[12px] md:text-sm whitespace-nowrap"
                        >
                            Track Package
                        </Button>
                    </div>
                </div>
            </div>


            {/* Cancel + Info (top-right absolute) */}
            <div className="absolute top-2 left-31 border border-gray-500 px-2 py-0.5 rounded text-sm ">
                Quantity: {item.quantity || 10}
            </div>
            <div className="absolute top-2 right-1 flex items-center gap-1 md:gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 text-xs md:text-sm font-medium h-auto p-0"
                >
                    Cancel Order
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 p-0 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4v4M8 12h.01" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                </Button>
            </div>

        </div>
    );
};

export default OrderProductDetails;
