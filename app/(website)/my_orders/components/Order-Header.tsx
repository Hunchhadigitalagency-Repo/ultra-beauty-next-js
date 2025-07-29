import React from "react";
import Link from "next/link";
import OrderProductDetails from "./Order-Details";
import orderImage from "@/assets/Rectangle976.png";

interface OrderProducts {
    quantity: number;
    name: string;
    price: number;
}

interface OrderHearderDetails {
    itemId: string;
    totalItems: number;
    status: string;
    orderItems: OrderProducts[];
}

const OrderHeader: React.FunctionComponent<OrderHearderDetails> = ({ itemId, totalItems, status,
    // orderItems,
}) => {

    return (
        <section>
            <div className="md:h-12 h-10 px-4 md:px-6 bg-secondary rounded-sm font-medium text-custom-black text-sm flex items-center justify-between">
                {/* Left side: Order Info */}
                <div className="flex flex-wrap gap-2 md:gap-6 xl:gap-8 font-poppins text-xs md:text-sm">
                    <h4>Order No:{itemId}</h4>
                </div>
                {/* Right side: Status */}
                <div className="flex flex-wrap gap-2 items-center md:gap-6 text-xs md:text-sm">
                    <h4>
                        Total Items: {totalItems}
                    </h4>
                    <Link href="/order-tracking">
                        {status === "delivered" ? (
                            <span className="text-white uppercase text-xs md:text-sm px-3 py-1.5  bg-green rounded-none  text-center">
                                {status}
                            </span>
                        ) :
                            <span className="text-white uppercase text-xs md:text-sm px-3 py-1.5  bg-primary rounded-none  text-center">
                                {status}
                            </span>
                        }
                    </Link>
                </div>
            </div>

            <OrderProductDetails
                item={{
                    id: 1,
                    name: "Sensanori Vitamin Cream for Antiaging",
                    description:
                        "A product that helps to reduce wrinkles and makes skin glowing.",
                    image: orderImage,
                    color: "Blue",
                    size: "XXL",
                    originalPrice: 45000,
                    currentPrice: 45000,
                    discount: 20,
                    quantity: 1,
                    selected: true,
                    status: 'delivered'

                }}
            />
            <OrderProductDetails
                item={{
                    id: 2,
                    name: "Sensanori Vitamin Cream for Antiaging",
                    description:
                        "A product that helps to reduce wrinkles and makes skin glowing.",
                    image: orderImage,
                    color: "Ivory White",
                    size: "Large",
                    originalPrice: 50000,
                    currentPrice: 40000,
                    discount: 20,
                    quantity: 2,
                    selected: false,
                    status: 'packed'
                }}
            />
        </section>
    );
};

export default OrderHeader;
