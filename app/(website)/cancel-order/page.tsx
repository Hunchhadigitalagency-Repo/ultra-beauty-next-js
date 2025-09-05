
import React from 'react';
// import OrderActionCard from '@/components/common/cards/order-action-card';
import CancelOrderForm from './cancel-order-form';
import SectionHeader from '@/components/common/header/section-header';

const CancelOrder: React.FunctionComponent = () => {

    return (
        <div className="padding space-y-8 bg-[#FAFAFA]">
            <SectionHeader
                titleClassName='font-playfair font-bold text-2xl'
                title="Cancel Order"
                descriptionClassName='font-poppins text-xs md:text-sm'
                description="See the cancel order details" />
            <div className='px-5 py-2 text-sm md:text-base bg-secondary rounded-md'>
                Product
            </div>
            {/* <OrderActionCard
                product={{
                    date: "2025-07-29",
                    quantity: 1,
                    price: 250,
                    size: "M",
                    weight: "500g",
                    color: "Beige",
                    total: 250,
                    title: "Sensanori Vitamin Cream",
                    image: "/some-image.png",
                    descrption: "Wrinkle-reducing cream"
                }} /> */}
            <CancelOrderForm />
        </div>

    )
}

export default CancelOrder