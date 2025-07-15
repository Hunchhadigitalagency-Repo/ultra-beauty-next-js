import { OrderResponse } from "@/types/profile";
import { Col } from "@/types/table";
import Image from "next/image";

export const MyOrderConstants = (
    onDeleteClick: (order: OrderResponse) => void
): Col<OrderResponse>[] => {
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
            render: (order: OrderResponse) => (
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-16 h-16 relative">
                        <Image
                            layout="fill"
                            className="object-cover rounded-[10px]"
                            src={order.items.image}
                            alt="Item Image"
                        />
                    </div>
                    <p>{order.items.description}</p>
                </div>
            ),
        },
        {
            title: 'Status',
            render: (order: OrderResponse) => (
                <span
                    className={
                        order.status === 'Delivered'
                            ? 'text-green-600'
                            : order.status === 'Processed'
                                ? 'text-yellow-600'
                                : order.status === 'Canceled'
                                    ? 'text-red-600'
                                    : ''
                    }
                >
                    {order.status}
                </span>
            ),
        },
        {
            title: 'Quantity',
            render: (order: OrderResponse) => order.quantity,
        },
        {
            title: 'Total',
            render: (order: OrderResponse) => `$${order.total}`,
        },
        {
            title: 'Action',
            render: (order: OrderResponse) => (
                <button
                    className="text-[#1477B4] cursor-pointer"
                    onClick={() => onDeleteClick(order)}
                >
                    Delete
                </button>
            ),
        },
    ];
};
