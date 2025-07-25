import React from 'react';
import OrderTable from '../Table/order-table';

const data = [
    {
        id: 1,
        orderNumber: 'ORD-001',
        orderDate: '2025-07-10',
        items: {
            image: 'https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto.',
        },
        status: 'Canceled',
        quantity: 2,
        total: 1200,
    },
    {
        id: 2,
        orderNumber: 'ORD-002',
        orderDate: '2025-07-11',
        items: {
            image: 'https://www.shutterstock.com/image-photo/washington-dc-usa-april-7-600nw-2609091587.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, iusto.',
        },
        status: 'Canceled',
        quantity: 1,
        total: 100,
    },
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