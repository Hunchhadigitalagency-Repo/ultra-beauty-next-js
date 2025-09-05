'use client'
import React from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { CreateOrderResponse } from '@/types/orders';

interface ActionCardProps {
    product: CreateOrderResponse | null;
}

const OrderActionCard: React.FunctionComponent<ActionCardProps> = ({ product }) => {
    const notCancelledOrders = product?.order_details && product.order_details.filter(order => order.status !== "Cancelled");

    return (
        <div className='w-full flex flex-col gap-10 p-6 rounded-md bg-white min-h-56 md:min-h-56 xl:min-h-[80%]'>
            {
                product && notCancelledOrders && notCancelledOrders.length > 0 ? notCancelledOrders.map((order, index) => (
                    <div key={index} className="inner-contents flex flex-col md:flex-row gap-4 xl:gap-5">
                        {/* Image Section */}
                        <div className="image relative w-full h-48 flex-shrink-0 md:w-24 md:h-24 rounded-md xl:w-24">
                            <Image
                                src={order.product.image}
                                alt={order.product.name}
                                fill
                                className="object-cover w-full h-full rounded-md"
                            />
                        </div>

                        {/* Product Detail Section */}
                        <div className='cancel-product-details flex flex-col w-full'>
                            <div className='w-full md:max-w-[37vw] lg:max-w-[45vw] xl:max-w-[50vw]'>
                                <h3 className='pt-1 font-playfair font-bold text-2xl'>{order.product.name}</h3>
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(order.product.general_description),
                                }} className='font-poppins text-sm mt-2 line-clamp-2 leading-snug truncate' >
                                </p>
                            </div>
                            <div className='variants flex mt-4 md:max-w-[45vw] lg:max-w-[45vw] xl:max-w-[50vw]'>
                                <div className='flex flex-wrap gap-3'>
                                    {
                                        order.product_variant && order.product_variant.product_variants && order.product_variant.product_variants.map((variant: any, index: number) => {
                                            return <div key={index} className="border-[1px] border-gray-500 lg:min-w-30 py-1  md:font-semibold font-poppins text-xs md:text-sm">
                                                <p className='text-sm font-medium px-2 '>{variant.attribute.name} : {variant.attribute_variant.name}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Total Price */}
                        <div className="total-price min-w-[10vw] flex mt-2 md:mt-0 md:flex">
                            <div className='self-end'>
                                <h1 className="text-md font-medium font-poppins">
                                    Total
                                </h1>
                                <p className="font-semibold font-poppins text-primary text-lg lg:text-xl">
                                    NRS. {order.total_price}
                                </p>
                            </div>
                        </div>
                    </div>
                )) : null
            }
        </div>
    )
}


export default OrderActionCard