
"use client"

import React from 'react';
import OrderActionCard from '@/components/common/cards/order-action-card';
import CancelOrderForm from '../cancel-order-form';
import SectionHeader from '@/components/common/header/section-header';
import useFetchData from '@/hooks/use-fetch';
import { CreateOrderResponse } from '@/types/orders';
import { useParams } from 'next/navigation';

const CancelOrder: React.FunctionComponent = () => {
    const { id } = useParams();
    const { data, loading, error } = useFetchData<CreateOrderResponse>(`order/${id}`, true)

    return (

        <div className="space-y-8 bg-gray-100 padding">
            <SectionHeader titleClassName='font-playfair font-bold text-2xl' title="Cancel Order"
                descriptionClassName='font-poppins text-xs md:text-sm'
                description="See the cancel order details" />
            <div className='px-5 py-2 text-sm rounded-md md:text-base bg-secondary'>
                Product
            </div>
            {
                loading ? <div>Loading...</div> : error ? <p>Something went wrong</p> :
                    <OrderActionCard
                        product={data}
                    />
            }
            <CancelOrderForm orderId={id as number | undefined} />
        </div>
    )
}

export default CancelOrder