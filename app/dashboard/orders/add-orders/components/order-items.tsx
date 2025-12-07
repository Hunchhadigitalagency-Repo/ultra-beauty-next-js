import CustomTable from '@/components/common/table/custom-table';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React from 'react';
import { CartConstants } from './create-order-constant';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { clearProduct } from '@/redux/features/checkout-slice';
import { HiArrowRight } from 'react-icons/hi2';

interface Props {
    isShipping: boolean;
}

const OrderItems = ({ isShipping }: Props) => {
    const { productItems } = useAppSelector(state => state.checkouts);
    const dispatch = useAppDispatch();
    const router = useRouter()
    return (
        <>
            <section className="bg-white p-6 lg:p-10 rounded-lg shadow-md ">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Order List</h1>
                    <Button onClick={() => dispatch(clearProduct())}> Clear Order</Button>
                </div>

                <div className="overflow-x-auto">
                    <CustomTable
                        cols={CartConstants(dispatch)}
                        data={productItems}
                        height="h-fit"
                    />
                </div>
            </section>
            <div className="flex justify-end mt-6">
                {
                    !isShipping &&
                    <Button onClick={() => router.push('/dashboard/orders/add-orders/shipping')} className='px-4 py-2'>
                        Next <HiArrowRight className='text-white' />
                    </Button>
                }
            </div>
        </>
    );
};

export default OrderItems;
