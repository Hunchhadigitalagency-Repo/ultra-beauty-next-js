"use client"
import React from 'react';
import { useParams } from "next/navigation";
import useFetchData from "@/hooks/use-fetch";
import { CreateOrderResponse } from "@/types/orders";
import ReturnForm from '../components/return-form';
import SectionHeader from '@/components/common/header/section-header';
import OrderActionCard from '@/components/common/cards/order-action-card';

const ReturnOrder: React.FunctionComponent = () => {

    const { id } = useParams();
    const { data } = useFetchData<CreateOrderResponse>(`order/${id}`, true);


    return (
        <section className='space-y-8 padding'>
            <SectionHeader
                title='Return  Details'
                description='Please fill up the form below'
            />
            <div className='px-5 py-2 text-sm md:text-base bg-[#EEEEEE] rounded-md'>
                Product
            </div>
            <OrderActionCard
                product={data}
            />
            <ReturnForm />
        </section>
    )
}

export default ReturnOrder