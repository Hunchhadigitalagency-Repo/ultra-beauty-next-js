import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OrderProductDetails from "./Order-Details";
import { CreateOrderResponse } from "@/types/orders";
interface OrderHeaderDetails {
    orderItems: CreateOrderResponse | null;
}

const OrderHeader: React.FunctionComponent<OrderHeaderDetails> = ({ orderItems }) => {

    const router = useRouter()

    const { id, order_details, order_status } = orderItems ?? {};
    const handleCancelOrder = () => {
        router.push(`/cancel-order/${id}`)
    };

    const checkOrderStatus = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'bg-green'
            case 'returned':
                return 'bg-orange'
            case 'cancelled':
                return 'bg-red'
            default:
                return 'bg-gray-500'
        }
    }


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
                    {
                        order_status?.name &&
                        <Button
                            disabled={order_status?.name.toLowerCase() === 'cancelled' || order_status?.name.toLowerCase() === 'returned'}
                            className={`text-white uppercase text-[10px] md:text-sm px-2 md:px-3 py-1.5 ${order_status?.name && checkOrderStatus(order_status?.name.toLocaleLowerCase())}  rounded-none  text-center`}
                        >
                            {orderItems?.order_status.name}
                        </Button>
                    }
                    {
                        !order_status?.name.toLowerCase().includes('delivered') && (
                            <Button
                                disabled={order_status?.name.toLowerCase() === 'cancelled' || order_status?.name.toLowerCase() === 'returned'}
                                onClick={handleCancelOrder}
                                className={`text-white cursor-pointer uppercase text-[10px] md:text-sm px-2 md:px-3 py-1.5 bg-red rounded-none  text-center`}>
                                Cancel Orders
                            </Button>
                        )
                    }
                    <Button
                        onClick={() => router.push(`/order-tracking?order_id=${id}`)}
                        className={`text-white cursor-pointer uppercase text-[10px] md:text-sm px-2 md:px-3 py-1.5 bg-orange-500 rounded-none  text-center`}>
                        Track Orders
                    </Button>
                </div>
            </div>
            <OrderProductDetails
                id={id}
                orderStatus={order_status}
                orderDetails={orderItems?.order_details || []}
            />
        </section>
    );
};

export default OrderHeader;
