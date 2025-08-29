import React from 'react';
import useFetchData from '@/hooks/use-fetch';
import CustomTable from '@/components/common/table/custom-table';
import { MyCancellationConstants } from '../Table/my-cancellations-constants';
import { CancelOrderResponse } from '@/types/orders';


const MyCancellations: React.FunctionComponent = () => {

    const { data, loading, error } = useFetchData<CancelOrderResponse>('cancel-orders', true);

    return (
        <div className='flex flex-col gap-5'>
            <h1 className="text-primary font-medium text-xl">Cancelled Orders</h1>
            <CustomTable
                cols={MyCancellationConstants()}
                loading={loading}
                error={error}
                data={data?.results || []}
                height="h-auto"
            />
        </div>
    )
}

export default MyCancellations