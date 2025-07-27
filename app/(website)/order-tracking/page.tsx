import React from 'react';
import OrderTrack from './components/order-track';
import SectionHeader from '@/components/common/header/section-header';

const OrderTracking: React.FunctionComponent = () => {
    return (
        <main className="space-y-4 padding">
            <SectionHeader
                title='Order Tracking'
                description='Sell the detaiuls of the products'
            />
            <OrderTrack />
        </main>
    )
}

export default OrderTracking