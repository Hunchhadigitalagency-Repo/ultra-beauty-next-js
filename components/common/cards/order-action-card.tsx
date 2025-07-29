'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import SectionHeader from '../header/section-header';
import CancelOrderPage from '@/app/(website)/cancel-order/cancel-order';
import CancelOrderForm from '@/app/(website)/cancel-order/cancel-order-form';

const OrderActionCard = () => {
    const router = useRouter()
    router.push('/cancel-order')

    return (
        <div className="padding space-y-8 bg-gray-100">
            <SectionHeader titleClassName='font-playfair font-bold text-2xl' title="Cancel Order"
                descriptionClassName='font-poppins text-xs md:text-sm'
                description="See the cancel order details" />
            <CancelOrderPage date={'07/04/2025'} quantity={2} price={25000} size={'xl'} weight={'100 gram'} color={'white'} total={25000} />
            <CancelOrderForm />
        </div>
    );
};



export default OrderActionCard