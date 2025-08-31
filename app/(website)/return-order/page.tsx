"use client"
import React from 'react';
import SectionHeader from '@/components/common/header/section-header';
import ReturnForm from './components/return-form';
// import OrderActionCard from '@/components/common/cards/order-action-card';

const ReturnOrder: React.FunctionComponent = () => {

    return (
        <section className='padding space-y-8 bg-[#FAFAFA]'>
            <SectionHeader
                title='Return  Details'
                description='See the Return order Details.'
            />
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
                }}
            /> */}
            <ReturnForm />
        </section>
    )
}

export default ReturnOrder