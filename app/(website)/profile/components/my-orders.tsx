import React from 'react';
import useFetchData from '@/hooks/use-fetch';
import { RecentOrdersResponseWithPagination } from '@/types/profile';
import OrderTable from './Table/order-table';

const MyOrders: React.FunctionComponent = () => {

    const { data: orderData, error: orderError, loading: orderLoading } = useFetchData<RecentOrdersResponseWithPagination>(`recent-orders`, true);
    const filtered_Order_Data = orderData?.results?.filter(order => order.order_details.length > 0);

    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-primary font-medium text-xl">My Orders</h1>
            <OrderTable isLoading={orderLoading} isError={orderError} data={filtered_Order_Data} />
        </div>)
}

export default MyOrders