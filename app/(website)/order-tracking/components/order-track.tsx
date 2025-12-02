'use client'
import React from 'react';
// import OrderStatus from './order-status';    
import StatusHeader from './status-header';
import OrderProduct from './order-product';
import DeliveryTimeline from './delivery-timeline';
import { useSearchParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch-data';
import { IOrder, IOrderLog } from '@/types/orders';
import { generateOrderStatus } from '@/lib/utils';
const OrderTrack: React.FunctionComponent = () => {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order_id')
    const { data: orders } = useFetchData<IOrder>(`/order/${orderId}/`)
    const { data: ordersStatus } = useFetchData<IOrderLog[]>(`/orders/${orderId}/status-logs/`)

    if (!ordersStatus) return null;

    const { logs } = generateOrderStatus(ordersStatus)

    function stripHtmlTags(html: string): string {
        if (!html) return "";
        return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    }



    return (
        <React.Fragment>
            {/* <OrderStatus
                status={status as any}
            /> */}
            <StatusHeader status={logs[logs.length - 1]?.title} is_track={true} />
            <div className="flex flex-col space-y-8 lg:flex-row-reverse justify-between items-start">
                <DeliveryTimeline statuses={logs as any} />
                {
                    orders && orders?.order_details?.map((item) => (
                        <React.Fragment key={item.id}>
                            <OrderProduct
                                imageSrc={item.product.image}
                                alt={item.product.name}
                                title={item.product.name}
                                description={stripHtmlTags(item.product.general_description)}
                                rating={item.product.average_rating || 0}
                                price={item.price}
                                quantity={item.quantity}
                                date={orders.order_created}
                            />
                        </React.Fragment>
                    ))
                }
            </div>
        </React.Fragment>
    )
}
export default OrderTrack