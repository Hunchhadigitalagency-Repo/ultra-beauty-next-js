
"use client"

import React from 'react';
import OrderActionCard from '@/components/common/cards/order-action-card';
import CancelOrderForm from '../cancel-order-form';
import SectionHeader from '@/components/common/header/section-header';
import useFetchData from '@/hooks/use-fetch';
import { CreateOrderResponse } from '@/types/orders';
import { useParams, useSearchParams } from 'next/navigation';

const CancelOrder: React.FunctionComponent = () => {

    const { id } = useParams();
    const searchParams = useSearchParams();
    const productId = searchParams.get("product");
    const { data, loading, error } = useFetchData<CreateOrderResponse>(`order/${id}`, true)

    const product = productId && data ? {
        ...data, order_details: data.order_details.filter(item => item.id === Number(productId))
    } : data;

    return (

        <div className="space-y-8 bg-[#FAFAFA] padding">
            <SectionHeader titleClassName='font-playfair font-bold text-2xl'
                title="Cancel Order"
                descriptionClassName='font-poppins text-xs md:text-sm'
                description="See the cancel order details" />
            <div className='px-5 py-2 text-sm rounded-md md:text-base bg-secondary'>
                Product
            </div>
            {
                loading ? <div>Loading...</div> : error ? <p>Something went wrong</p> :
                    <OrderActionCard
                        product={product}
                    />
            }
            <CancelOrderForm
                productId={productId ? Number(productId) : undefined}
                orderId={id ? Number(id) : undefined} />
        </div>
    )
}

export default CancelOrder