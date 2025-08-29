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
                <div className="relative flex flex-row items-start gap-2 p-2 bg-white md:gap-4 md:p-4 top-2" key={index}>
                    {/* Product Image */}

                    <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg md:w-32 md:h-28">
                        <Image
                            src={item.product.image}
                            alt={item.product.name}
                            height={96}
                            width={96}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2 md:justify-between">
                        <div className="space-y-2">
                            {/* Boxes */}
                            <div className="flex flex-wrap gap-3 md:gap-9">
                                <div className="border-[1px] border-gray-500 px-1 lg:min-w-70 py-1  md:font-semibold font-poppins text-xs md:text-sm">
                                    Date: {new Date(item.product.created_at).toLocaleString()}
                                </div>
                                <div
                                    className="border-[1px] border-gray-500 px-1 py-1 lg:min-w-30  md:font-semibold font-poppins text-xs md:text-sm">
                                    Quantity: {item.product.quantity}
                                </div>
                                <div className="border-[1px] border-gray-500 px-1 py-1 lg:min-w-30 md:font-semibold font-poppins text-xs md:text-sm">
                                    Nrs {item.product.price}
                                </div>
                                <div className="border-[1px] border-gray-500 px-1 py-1 lg:min-w-30 md:font-semibold font-poppins text-xs md:text-sm">
                                    Nrs {item.product.price}
                                </div>
                                <div className="border-[1px] border-gray-500 px-1 py-1 lg:min-w-30 md:font-semibold font-poppins text-xs md:text-sm">
                                    Nrs {item.product.price}
                                </div>
                                <div className="border-[1px] border-gray-500 px-1 py-1 lg:min-w-30 md:font-semibold font-poppins text-xs md:text-sm">
                                    Nrs {item.product.price}
                                </div>
                            </div>
                            {/* Title Description */}
                            <div className="flex flex-col max-w-[60vw]">
                                <h3 className="text-sm font-bold leading-snug font-playfair md:text-xl xl:text-2xl text-foreground line-clamp-2">
                                    {item.product.name}
                                </h3>
                                <h3
                                    className="text-xs leading-snug md:text-sm text-foreground line-clamp-2"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(item.product.general_description || "")
                                    }}
                                />
                            </div>
                        </div>

                        {/* Review Return */}
                        <div className="flex justify-end w-full md:items-center md:gap-3 xl:justify-between">
                            {OrderStatus?.name.toLowerCase() === "delivered" ? (
                                <div className="flex items-center justify-end w-full gap-5 md:items-start md:flex-row xl:flex-row xl:justify-end">
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
                            ) : OrderStatus?.name.toLowerCase() === "cancelled" ? (
                                <button
                                    onClick={handleCancelOrder}
                                    className="flex items-center justify-end w-full gap-2 text-xs font-medium cursor-pointer text-primary md:items-center hover:text-primary md:text-sm"
                                >
                                    Cancelled

                                </button>
                            ) : OrderStatus?.name.toLowerCase() === "pending" ? (
                                <button
                                    onClick={handleCancelOrder}
                                    className="flex items-center justify-end w-full gap-2 text-xs font-medium cursor-pointer md:items-center text-primary hover:text-primary md:text-sm"
                                >
                                    Cancel Order
                                    <CircleAlert className="w-4 h-4" />
                                </button>
                            ) : OrderStatus?.name.toLowerCase() === "returned" ? (
                                <button
                                    onClick={handleCancelOrder}
                                    className="flex items-center justify-end w-full gap-2 text-xs font-medium text-yellow-600 cursor-pointer md:items-center hover:text-primary md:text-sm"
                                >
                                    Returned

                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default OrderProductDetails;
