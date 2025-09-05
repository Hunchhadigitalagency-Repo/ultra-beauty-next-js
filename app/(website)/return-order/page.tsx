"use client"
import React from 'react';
import SectionHeader from '@/components/common/header/section-header';
// import OrderActionCard from '@/components/common/cards/order-action-card';

const ReturnOrder: React.FunctionComponent = () => {

    return (
        <section className='padding space-y-8 bg-[#FAFAFA]'>
            <SectionHeader
                title='Return  Details'
                description='See the Return order Details.'
            />
        </section>
    )
}

export default ReturnOrder