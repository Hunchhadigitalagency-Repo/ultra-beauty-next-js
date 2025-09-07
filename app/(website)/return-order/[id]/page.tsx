"use client"
import React from 'react';
import { useParams, useSearchParams } from "next/navigation";
import useFetchData from "@/hooks/use-fetch";
import { CreateOrderResponse, OrderDetail } from "@/types/orders";
import ReturnForm from '../components/return-form';
import SectionHeader from '@/components/common/header/section-header';
import OrderActionCard from '@/components/common/cards/order-action-card';

const ReturnOrder: React.FunctionComponent = () => {

    const { id } = useParams();
    const { data } = useFetchData<CreateOrderResponse>(`order/${id}`, true);


    const searchParams = useSearchParams()
    const productId = searchParams.get("product")
    const orderdetails = data?.order_details

    const filteredOrderDetail: OrderDetail | undefined = data?.order_details.find((item) => item.id === Number(productId))
    const matchedDetail = orderdetails?.find((item) => item.id === Number(productId))

    return (
        <section className='space-y-8 padding'>
            <SectionHeader
                title='Return  Details'
                description='Please fill up the form below'
            />
            <div className='px-5 py-2 text-sm md:text-base bg-secondary rounded-md'>
                Product
            </div>
            {filteredOrderDetail && <OrderActionCard
                product={{ ...data, order_details: [filteredOrderDetail] } as CreateOrderResponse}
            />}
            {data && productId && matchedDetail && (
                <ReturnForm
                    order_id={data?.id}
                    order_detail_id={Number(productId)}
                    quantity={matchedDetail.quantity}
                />
            )}
        </section>
    )
}

export default ReturnOrder