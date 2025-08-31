import React from "react";
import Link from "next/link";
import OrderProductDetails from "./Order-Details";
import { CreateOrderResponse } from "@/types/orders";



interface OrderHeaderDetails {
    orderItems: CreateOrderResponse | null;
}

const OrderHeader: React.FunctionComponent<OrderHeaderDetails> = ({ orderItems }) => {
    const { id, order_details, order_status } = orderItems ?? {};

    return (
        <section className="shadow">

            <div className="flex items-center justify-between h-10 px-4 text-sm font-medium rounded-sm md:h-12 md:px-6 bg-secondary text-custom-black">
                {/* Left side: Order Info */}
                <div className="flex flex-wrap gap-2 text-xs md:gap-6 xl:gap-8 font-poppins md:text-sm">
                    <h4>Order No:{id}</h4>
                </div>
                {/* Right side: Status */}
                <div className="flex flex-wrap items-center gap-2 text-xs md:gap-6 md:text-sm">
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
