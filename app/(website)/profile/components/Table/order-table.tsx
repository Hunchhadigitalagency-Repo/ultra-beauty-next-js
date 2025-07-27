import React from 'react';
import { OrderResponse } from '@/types/profile';
import { MyOrderConstants } from './my-order-constants';
import CustomTable from '@/components/common/table/custom-table';

export interface OrderTableProps {
    data: OrderResponse[];
}


const OrderTable: React.FC<OrderTableProps> = ({ data }) => {

    return (
        <CustomTable
            cols={MyOrderConstants()}
            data={data as OrderResponse[]}
            height="h-auto"
        />
    );
};

export default OrderTable;
