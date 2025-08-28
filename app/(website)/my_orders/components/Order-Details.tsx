"use client";
import React from "react";
import Image from "next/image";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrderDetail, OrderStatus } from "@/types/orders";
import DOMPurify from "dompurify";

interface OrderProductProps {
    OrderDetails: OrderDetail[]
    OrderStatus: OrderStatus | undefined
}

const OrderProductDetails: React.FunctionComponent<OrderProductProps> = ({ OrderDetails, OrderStatus }) => {
    console.log("Order Product ko details", OrderDetails)
    const router = useRouter();

    const handleCancelOrder = () => {
        router.push('/cancel-order')
    };

    const handleReturnOrder = () => {
        router.push('/return-order')
    };

    return (
        <div>
            {OrderDetails.map((item, index) => (
                <div className="relative flex flex-row items-start gap-2 p-2 md:gap-4 md:p-4 bg-white top-2" key={index}>
                    {/* Product Image */}

                    <div className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-28 rounded-lg overflow-hidden">
                        <Image
                            src={item.product.image}
                            alt={item.product.name}
                            height={96}
                            width={96}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col xl:flex-row gap-2 w-full md:justify-between">
                        <div className="space-y-2">
                            {/* Boxes */}
                            <div className=" flex justify-between gap-3 md:gap-9">
                                <div className="border-[1px] border-gray-500 px-1 py-1  md:font-semibold font-poppins text-xs md:text-sm">
                                    Date:{item.product.created_at}
                                </div>
                                <div
                                    className="border-[1px] border-gray-500 px-1 py-1  md:font-semibold font-poppins text-xs md:text-sm">
                                    Quantity: {item.product.quantity}
                                </div>
                                <div className="border-[1px] border-gray-500 px-1 py-1 md:font-semibold font-poppins text-xs md:text-sm">
                                    Nrs {item.product.price}
                                </div>
                            </div>
                            {/* Title Description */}
                            <div className="flex flex-col max-w-[60vw]">
                                <h3 className="font-bold font-playfair text-sm md:text-xl xl:text-2xl text-foreground leading-snug line-clamp-2">
                                    {item.product.name}
                                </h3>
                                <h3
                                    className="text-xs md:text-sm text-foreground leading-snug truncate line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(item.product.detail_description || "")
                                    }}
                                />
                            </div>
                        </div>

                        {/* Review Return */}
                        <div className="flex  md:items-center md:gap-3 justify-end xl:justify-between w-full">
                            {OrderStatus?.name.toLowerCase() === "delivered" ? (
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
                                    className="flex justify-end items-center gap-2 w-full cursor-pointer md:items-center text-primary hover:text-primary text-xs md:text-sm font-medium"
                                >
                                    Cancel Order
                                    <CircleAlert className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default OrderProductDetails;
