"use client";
import React from "react";
import Image from "next/image";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderProductProps {
    item: any;
}

const OrderProductDetails = ({ item }: OrderProductProps) => {

    const router = useRouter()
    const handleCancelOrder = () => {
        router.push('/cancel-order')
    }
    const handleReturnOrder = () => {
        router.push('/return-order')
    }

    return (
        
        <div className="relative flex flex-row items-start gap-2 p-2 md:gap-4 md:p-4 bg-white top-2">
            {/* Product Image */}
            <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-28 rounded-lg overflow-hidden">
                <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    height={96}
                    width={96}
                    className="object-cover w-full h-full"
                />
            </div>
            {/* Quantity, Info, Price, Buttons */}
            <div className="flex flex-col xl:flex-row gap-2 w-full md:items-center md:justify-between  mt-1">
                {/* Quantity + Title +Description */}
                <div className="flex flex-col mt-6 md:mt-10 max-w-[60vw]">
                    <h3 className="font-bold font-playfair text-sm md:text-xl xl:text-2xl text-foreground leading-snug line-clamp-2">
                        {item.name}
                    </h3>
                    <h3 className="text-xs md:text-sm text-foreground leading-snug truncate line-clamp-2">
                        {item.description}
                    </h3>
                </div>

                {/* Buttons */}
                <div className="flex  md:items-center md:gap-3 justify-end xl:justify-between w-full">
                    {/* Delivered order status */}
                    {item.status === "delivered" ? (
                        <div className="flex justify-end gap-5 md:items-start items-center md:flex-row  xl:flex-row xl:justify-end w-full">
                            <button className="bg-secondary border cursor-pointer border-primary rounded-none hover:bg-primary hover:text-white text-black px-1 py-1 md:px-1 md:py-1 xl:px-2 xl:py-2 text-[12px] md:text-sm whitespace-nowrap">
                                Write Review
                            </button>
                            <button
                                onClick={handleReturnOrder}
                                className="bg-secondary border cursor-pointer border-primary rounded-none hover:bg-primary hover:text-white text-black px-1 py-1 md:px-1 md:py-1 xl:px-2 xl:py-2 text-[12px] md:text-sm whitespace-nowrap"
                            >
                                Return Order
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleCancelOrder}
                            className="flex justify-end w-full cursor-pointer md:items-center text-primary hover:text-primary text-xs md:text-sm font-medium"
                        >
                            Cancel Order

                            <CircleAlert />
                        </button>
                    )}
                </div>
            </div>
            {/* Cancel + Info (top-right absolute) */}
            <div className="absolute left-28 px-0 py-0 md:px-5 top-2 md:left-35 md:py-5 flex justify-between gap-3 md:gap-9">
                <div className="border-[1px] border-gray-500 px-1 py-1  md:font-semibold font-poppins text-xs md:text-sm">
                    Date:{item.Date || "27/06/2025"}
                </div>
                <div
                    className="border-[1px] border-gray-500 px-1 py-1  md:font-semibold font-poppins text-xs md:text-sm">
                    Quantity: {item.quantity || 10}
                </div>
                <div className="border-[1px] border-gray-500 px-1 py-1 md:font-semibold font-poppins text-xs md:text-sm">
                    Nrs {item.price || "45,000"}
                </div>
            </div>
        </div>
    );
};

export default OrderProductDetails;
