import React from 'react';
import OrderHeader from './Order-Header';
import OrderPayment from './Order-payment';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch';
import { CreateOrderResponse } from '@/types/orders';
import SectionHeader from '@/components/common/header/section-header';


const   Order: React.FunctionComponent = () => {

    const { id } = useParams();
    const { data, loading, error } = useFetchData<CreateOrderResponse>(`order/${id}/`, true)

    return (
        <section className="space-y-4 padding">
            <SectionHeader
                title='Order Details'
                description='See all the order details'
            />

            {
                loading ? (
                    <p className="text-sm text-center text-muted-foreground">
                        Loading Orders
                    </p>
                ) : error ? (
                    <p className="text-sm font-medium text-center text-red-500">
                        Something Went Wrong While Fetching Orders
                    </p>
                ) : data?.order_details.length === 0 ? (
                    <p className="text-sm text-center text-muted-foreground">
                        No Order Details Found
                    </p>
                ) : (<>
                    <OrderHeader
                        orderItems={data}
                    />
                    <OrderPayment paymentdetails={data} /></>)
            }
        </section>
    )
}

export default Order
