import React from 'react'
import OrderTable from './Table/order-table'
import { data } from './MyProfile/my-profile'
const MyOrders: React.FunctionComponent = () => {
    return (
        <div className="flex flex-col gap-3">
            
            <h1 className="text-[#1477B4] font-medium text-xl">Recent Orders</h1>
            <OrderTable data={data} />
        </div>)
}

export default MyOrders