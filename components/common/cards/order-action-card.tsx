'use client'
import React from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { CreateOrderResponse } from '@/types/orders';

interface ActionCardProps {
    product: CreateOrderResponse | null
}

const OrderActionCard: React.FunctionComponent<ActionCardProps> = ({ product }) => {

    return (
        <div>
            {product?.order_details.map((item) => (
                <div key={item.id} className='w-full bg-white min-h-56 md:min-h-56 xl:min-h-[80%]'>
                    <div className="relative flex flex-row items-start w-full gap-2 p-2 md:items-start md:gap-4 md:p-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-40 h-40 overflow-hidden rounded-lg ">
                            <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={"Image"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className='w-full py-2 md:py-5'>
                            <div className="flex flex-col max-w-[60vw]">
                                <h3 className="text-sm font-medium md:text-xl text-primary">
                                    {item.product.name}
                                </h3>
                                <p dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(item.product.general_description),
                                }} className="text-xs leading-snug truncate md:text-sm text-foreground line-clamp-2">

                                </p>
                            </div>
                            {/* Info Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-[85%_15%] py-0 md:py-1.5 text-xs font-poppins w-full">
                                <div className='grid w-full grid-cols-2 gap-1 py-3 md:grid-cols-3 xl:grid-cols-4 md:gap-2 lg:font-medium'>
                                    {product.order_details.filter(details => details.id === item.id).flatMap((item) =>
                                        item.product_variant?.product_variants.map((variant: any) => (
                                            <div
                                                key={variant.id}
                                                className="px-1 py-1 text-xs border rounded-none border-primary md:px-2 md:text-sm md:py-2"
                                            >
                                                {variant.attribute.name}: {variant.attribute_variant.name}
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="flex flex-col items-center w-full">
                                    <h1 className="text-sm font-medium md:text-sm lg:text-xl font-poppins">
                                        Total
                                    </h1>
                                    <h1 className="text-sm font-semibold text-secondary md:text-xl font-poppins">
                                        NRS. {item.total_price}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderActionCard