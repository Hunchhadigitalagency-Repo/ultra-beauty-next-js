import React from 'react';
import OrderHeader from './Order-Header';
import SectionHeader from '@/components/common/header/section-header';
import OrderPayment from './Order-payment';

const Order: React.FunctionComponent = () => {

    const orderItems: any = [];

    return (
        <section className="padding space-y-4">
            <SectionHeader
                title='Order Details'
                description='See all the order details'
            />
            <OrderHeader
                itemId={"#90910398123"}
                totalItems={2}
                status={'delivered'}
                orderItems={orderItems}
            />
            <OrderPayment/>
        </section>
    )
}

export default Order
