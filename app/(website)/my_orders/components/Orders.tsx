import SectionHeader from '@/components/common/header/section-header'
import React from 'react'
import OrderHeader from './Order-Header'

const Order = () => {

    const orderItems:any = [];
    return (
        <section className="padding space-y-4">
            <SectionHeader
                title='My Orders'
                description='See all the order details'
            />
            <OrderHeader
                itemId={"#90910398123"}
                totalItems={2}
                status={'placed'}
                orderItems={orderItems}
            />
        </section>
    )
}

export default Order
