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
        <div className='w-full bg-white min-h-56 md:min-h-56 xl:min-h-[80%]'>
            {
                product && notCancelledOrders && notCancelledOrders.length > 0 ? notCancelledOrders.map((order, index) => (
                    <div key={index} className="relative flex flex-row items-start w-full gap-4 p-2 md:items-start md:gap-8 md:p-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg md:w-32 md:h-28">
                            <Image
                                src={order.product.image}
                                alt={order.product.name}
                                height={96}
                                width={96}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className='py-2 w-full max-w-[60vw] md:w-full'>
                            <div className="flex flex-col gap-2 md:max-w-[40vw] lg:max-w-[45vw]">
                                <h3 className="text-sm font-medium font-playfair md:text-xl lg:text-2xl">
                                    {order.product.name}
                                </h3>
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(order.product.general_description),
                                }} className="text-xs leading-snug truncate font-poppins md:text-sm text-foreground line-clamp-2">
                                </p>
                            </div>
                            {/* Info Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-[85%_15%] py-0 md:py-1.5 text-xs font-poppins w-full">
                                <div className='grid w-full grid-cols-2 gap-1 py-3 md:grid-cols-3 xl:grid-cols-6 md:gap-4 lg:font-semibold'>
                                    {
                                        order.product_variant && order.product_variant.product_variants && order.product_variant.product_variants.map((variant: any, index: number) => {
                                            return <div key={index} className="px-1 py-1 border border-gray-500 rounded-sm md:px-2 md:py-2">
                                                <p key={index} className='flex items-center justify-center h-full text-xs md:text-sm'>{variant.attribute.name} : {variant.attribute_variant.name}</p>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="flex flex-col items-start w-full">
                                    <h1 className="text-sm font-medium font-poppins md:text-md lg:text-lg">
                                        Total
                                    </h1>
                                    <h1 className="text-sm font-semibold font-poppins text-primary md:text-md lg:text-lg xl:text-xl">
                                        NRS. {order.total_price}{/* NRS. {product.total} */}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : null
            }
        </div>
    )
}


export default OrderActionCard