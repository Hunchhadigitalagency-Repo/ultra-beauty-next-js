import React from 'react';
import { OrderResponse } from '@/types/profile';
import { MyOrderConstants } from './my-order-constants';
import CustomTable from '@/components/common/table/custom-table';

export interface OrderTableProps {
  isLoading: boolean;
  isError: Error | null;
  data: OrderResponse[] | undefined;
}

const OrderTable: React.FC<OrderTableProps> = ({ data, isLoading, isError }) => {

  return (
    <CustomTable
      cols={MyOrderConstants()}
      loading={isLoading}
      error={isError}
      data={data as OrderResponse[]}
      height="h-auto"
    />
  );
};

export default OrderTable;