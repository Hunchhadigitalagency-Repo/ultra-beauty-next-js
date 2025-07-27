import { OrderResponse } from "@/types/profile";
import { Col } from "@/types/table";
import { useRouter } from "next/navigation";

export const MyOrderConstants = (

): Col<OrderResponse>[] => {

    const router = useRouter();

    return [
        {
            title: 'Order Number',
            render: (order: OrderResponse) => order.orderNumber,
        },
        {
            title: 'Order Date',
            render: (order: OrderResponse) => order.orderDate,
        },
        {
            title: 'Items',
            render: () => (
                <div>
                    Images
                </div>
            )
        },
        {
            title: 'Total',
            render: (order: OrderResponse) => `$${order.total}`,
        },
        {
            title: 'Action',
            render: () => (
                <button
                    className="text-primary cursor-pointer"
                    onClick={() => router.push('/my_orders')}
                >

                    Manage
                </button>
            ),
        },
    ];
};
