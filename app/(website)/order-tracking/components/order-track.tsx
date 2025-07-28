import React from 'react';
import OrderStatus from './order-status';
import StatusHeader from './status-header';
import OrderProduct from './order-product';
import DeliveryTimeline from './delivery-timeline';

const OrderTrack: React.FunctionComponent = () => {

    const data = [
        {
            date: "Jun 15, 2025, 10:15 PM",
            title: "Delivered",
            description: "The Product has been delivered.",
            isActive: true,
            reviewLink: true,
        },
        {
            date: "Jun 15, 2025, 10:15 PM",
            title: "Delivery failed",
            description: "The Product has been delivered.",
        },
        {
            date: "Jun 15, 2025, 10:15 PM",
            title: "Delivery Failed",
            description: "The Product has been delivered.",
        },
        {
            date: "Jun 15, 2025, 10:15 PM",
            title: "Reached",
            description: "The Product has been delivered.",
        },
        {
            date: "Jun 15, 2025, 10:15 PM",
            title: "Shiped",
            description: "The Product has been delivered.",
        },
        {
            date: "Jun 15, 2025, 10:15 PM",
            title: "Placed",
            description: "The Product has been delivered.",
        },
    ];

    return (
        <React.Fragment>
            <OrderStatus
                status={{
                    processing: 'complete',
                    packed: 'complete',
                    shipped: 'complete',
                    delivered: 'complete',
                }}
            />
            <StatusHeader />
            <div className="flex flex-col space-y-8 lg:flex-row justify-between">

                <DeliveryTimeline statuses={data} />
                <OrderProduct
                    imageSrc="https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg"
                    alt="Sample product"
                    title="Cool Backpack"
                    description="A durable and stylish backpack for all your travel needs."
                    rating={4.7}
                    price={2499}
                    quantity={2}
                    date={'03/21/2025'}
                />
            </div>
        </React.Fragment>
    )
}

export default OrderTrack