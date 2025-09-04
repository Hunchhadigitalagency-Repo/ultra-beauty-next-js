import Link from "next/link";
import Image from "next/image";
import { Col } from "@/types/table";
import { CancelResultResponse } from "@/types/orders";
export const MyCancellationConstants = (
): Col<CancelResultResponse>[] => {
    return [
        {
            title: 'Order Number',
            render: (order: CancelResultResponse) => order.order_id,
        },
        {
            title: 'Order Date',
            render: (order: CancelResultResponse) =>
                new Date(order.order_created).toLocaleString([], {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                }).toUpperCase(),
        },
        {
            title: 'Items',
            render: (order: CancelResultResponse) => {
                return (
                    <div className="flex items-center gap-2 relative flex-wrap">
                        <div className="relative w-10 h-10">
                            <Image
                                src={order.product.image}
                                alt={order.product.name || "product"}
                                fill
                                className="object-fill rounded"
                            />
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Status',
            render: (order: CancelResultResponse) => (
                <p className={`text-white py-2 flex items-center justify-center w-24 rounded-md ${(() => {
                    switch (order.status.toLowerCase()) {
                        case 'delivered': return 'bg-green';
                        case 'cancelled': return 'bg-red';
                        case 'returned': return 'bg-orange';
                        default: return 'bg-yellow';
                    }
                })()
                    }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
            ),
        },
        {
            title: 'Total',
            render: (order: CancelResultResponse) => `Nrs.${order.total_price.split(".")[0]}`,
        },
        {
            title: 'Action',
            render: (order: CancelResultResponse) => (
                <Link href={`/my_orders/${order.order_id}`}
                    className="cursor-pointer text-primary"
                >
                    Manage
                </Link>
            ),
        },
    ];
};