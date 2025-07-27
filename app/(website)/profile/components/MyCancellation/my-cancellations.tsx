import React from 'react';
import OrderTable from '../Table/order-table';


export const data = [
    {
        id: 1,
        orderNumber: 'ORD-001',
        orderDate: '2025-07-10',
        items: [
            {
                image: 'https://images.unsplash.com/photo-1567001193226-f2ed96e9f9f3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                description: 'Soap',
            }, {
                image: 'https://images.unsplash.com/photo-1614159102397-ccd6c2400397?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                description: 'Oil',
            }
        ],
        status: 'Delivered',
        quantity: 2,
        total: 1200,
    }
];

const MyCancellations: React.FunctionComponent = () => {
    return (
        <div className='flex flex-col gap-5'>
            <h1 className="text-primary font-medium text-xl">Cancelled Orders</h1>
            <OrderTable data={data} />
        </div>
    )
}

export default MyCancellations