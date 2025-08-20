import React from 'react';
// import OrderTable from './Table/order-table';
// import { ORDER_DETAILS } from '@/constants/order-data';

const MyOrders: React.FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-primary font-medium text-xl">Recent Orders</h1>
            {/* <OrderTable data={ORDER_DETAILS} /> */}
        </div>)
}

export default MyOrders