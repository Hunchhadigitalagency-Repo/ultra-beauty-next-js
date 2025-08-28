import React from "react";
import Link from "next/link";
import OrderProductDetails from "./Order-Details";
import { CreateOrderResponse } from "@/types/orders";



interface OrderHeaderDetails {
    orderItems: CreateOrderResponse | null;
}

const OrderHeader: React.FunctionComponent<OrderHeaderDetails> = ({ orderItems }) => {
    console.log("Order Items ko details", orderItems)
    const { id, order_details, order_status } = orderItems ?? {};

    return (
        <section>

            <div className="md:h-12 h-10 px-4 md:px-6 bg-secondary rounded-sm font-medium text-custom-black text-sm flex items-center justify-between">
                {/* Left side: Order Info */}
                <div className="flex flex-wrap gap-2 md:gap-6 xl:gap-8 font-poppins text-xs md:text-sm">
                    <h4>Order No:{id}</h4>
                </div>
                {/* Right side: Status */}
                <div className="flex flex-wrap gap-2 items-center md:gap-6 text-xs md:text-sm">
                    <h4>
                        Total Items: {order_details?.length}
                    </h4>
                    <Link href="/order-tracking">
                        {orderItems?.payment_status === "delivered" ? (
                            <span className="text-white uppercase text-xs md:text-sm px-3 py-1.5  bg-green rounded-none  text-center">
                                {order_status?.name}
                            </span>
                        ) :
                            <span className="text-white uppercase text-xs md:text-sm px-3 py-1.5  bg-primary rounded-none  text-center">
                                {order_status?.name}
                            </span>
                        }
                    </Link>
                </div>
            </div>


            <OrderProductDetails
                OrderDetails={orderItems?.order_details || []}
                OrderStatus={orderItems?.order_status}
            />

        </section>
    );
};

export default OrderHeader;
