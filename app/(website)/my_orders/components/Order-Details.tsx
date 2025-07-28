"use client";

import React from "react";
import Image from "next/image";
import { CircleAlert } from "lucide-react";

interface OrderProductProps {
    item: any;
}


const OrderProductDetails = ({ item }: OrderProductProps) => {



    return (
        <div className="relative flex flex-row justify-between items-start md:items-center gap-2 p-2 md:gap-4 md:p-4  bg-white top-2">
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
                    <h3 className="font-bold font-playfair text-sm md:text-2xl text-foreground leading-snug line-clamp-2">
                        {item.name || "Sensanori Vitamin Cream for Antiaging"}
                    </h3>
                    <h3 className="md:block hidden text-xs md:text-sm text-foreground leading-snug line-clamp-2">
                        {item.name || "A product that helps to reduce wrinkles and makes glowing skin."}
                    </h3>
                </div>

                {/* Price + Buttons */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 min-w-[180px] w-full md:w-auto">
                    {/* Price + Buttons in a single row on small screens */}
                    {/* Delivered order status */}
                    {item.status === "delivered" ? (

                        <div className="flex justify-between items-center gap-10 w-full flex-wrap sm:flex-nowrap">
                            <div className="bg-[#FFE5EC] border cursor-pointer border-primary rounded-none hover:bg-primary hover:text-white text-black px-3 py-1 text-[12px] md:text-sm whitespace-nowrap">
                                Write Review
                            </div>
                            <div className="bg-[#FFE5EC] border cursor-pointer border-primary rounded-none hover:bg-primary hover:text-white text-black px-3 py-1 text-[12px] md:text-sm whitespace-nowrap">
                                Return Order
                            </div>
                        </div>
                    ) : (
                        <div className="flex cursor-pointer gap-1 items-center text-primary  hover:text-primary text-xs md:text-sm font-medium h-auto p-0">
                            <h1>
                                Cancel Order
                            </h1>
                            <CircleAlert />
                        </div>
                    )}

                </div>
            </div>


            {/* Cancel + Info (top-right absolute) */}
            <div className="absolute top-3 left-35 flex justify-between gap-9">
                <div className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                    Date:{item.Date || "27/06/2025"}
                </div>
                <div
                    className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                    Quantity: {item.quantity || 10}

                </div>
                <div className="border border-gray-500 px-2 py-0.5 font-semibold font-poppins text-sm">
                    Nrs. {item.price || "45,000"}
                </div>
            </div>

        </div>
    );
};

export default OrderProductDetails;
