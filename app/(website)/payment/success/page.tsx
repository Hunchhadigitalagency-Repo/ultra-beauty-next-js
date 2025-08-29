'use client'
import Link from 'next/link'
import { FaCheck } from 'react-icons/fa6'
import { useSearchParams } from 'next/navigation';
import { updateOrder } from '@/lib/api/order/order-apis';
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCart, decreaseCartCountBy, setOrderId } from '@/redux/features/cart-slice';

const Success: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const { orderId, cartItem } = useAppSelector(state => state.cart);
    const [totalAmount, setTotalAmount] = useState<number | null>(null)

    const hasOrdered = useRef(false);

    useEffect(() => {
        if (hasOrdered.current) return;
        hasOrdered.current = true;

        const handleOrder = async () => {
            const encodedData = searchParams.get("data");
            if (!encodedData || !orderId) return;

            try {
                const decoded = JSON.parse(atob(encodedData));

                if (decoded.status === "COMPLETE") {
                    setTotalAmount(decoded.total_amount);

                    const response = await updateOrder(
                        orderId,
                        decoded.status === "COMPLETE" ? "paid" : "failed",
                        decoded.total_amount,
                        decoded.transaction_code,
                        decoded.transaction_uuid
                    );

                    if (response.status === 200) {
                        dispatch(setOrderId(null));
                        dispatch(decreaseCartCountBy(cartItem.length));
                        dispatch(clearCart());
                    }
                }
            } catch (error) {
                console.error("Esewa callback error:", error);
            }
        };

        handleOrder();
    }, [searchParams, dispatch, orderId, cartItem.length]);



    return (
        <div className='flex justify-center items-center padding-x h-[70vh] xl:h-[calc(100vh-160px)]'>
            <div className='flex flex-col gap-4 text-center'>
                <div className='flex items-center justify-center w-20 h-20 mx-auto text-3xl text-white rounded-full bg-green'>
                    <FaCheck />
                </div>
                <h2 className='text-base font-semibold md:text-lg text-green'>
                    {totalAmount && `Payment of Rs.${totalAmount} was successful`}
                </h2>
                <h3 className='text-base font-semibold md:text-lg'>
                    Payment Success !
                </h3>
                <p className='text-xs md:text-sm'>
                    Your Payment  has been successfully conformed , thank you for trusting us !
                </p>
                <div className='flex justify-center gap-4'>
                    <button className='px-5 py-2 text-xs text-white md:text-sm bg-primary'>
                        <Link href="/shop">
                            Continue Shopping
                        </Link>
                    </button>
                    <button className='text-xs md:text-sm px-5 py-2  text-primary border-[1px] border-gray-300'>
                        <Link href="/profile">
                            Order Detail
                        </Link>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Success