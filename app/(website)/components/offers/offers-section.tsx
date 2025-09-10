"use client"

import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import OffersCard from './offers-card';
import useFetchData from '@/hooks/use-fetch';
import { ProductResponse } from '@/types/product';
import LinkText from '@/components/common/header/link-text';
import SectionHeader from '@/components/common/header/section-header';


const OffersSection = () => {

    const { data: saleProducts, loading, error } = useFetchData<ProductResponse>(`products-on-sale/`)

    return (
        <section className="padding space-y-4">
            <div className="flex justify-between items-center gap-4">
                <SectionHeader
                    className="max-w-[60%] sm:max-w-full"
                    title="The Offers"
                    titleClassName="font-playfair"
                    description="Best offers are once you buy them. Find all offer that we provide"
                />
                <LinkText title="Glow Shop" href="/shop" />
            </div>
            <div className="relative">
                <Carousel
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {
                            loading ? (
                                <div className='h-60 flex w-full justify-center items-center'>
                                    <p className='text-gray'>
                                        Loading Offer Section...
                                    </p>
                                </div>
                            ) : error ? (
                                <div className='h-60 flex w-full justify-center items-center'>
                                    <p className='text-red'>
                                        Error While Fetching Offer Section
                                    </p>
                                </div>
                            ) : (
                                saleProducts?.results?.length === 0 ? (
                                    <div className='h-60 flex w-full justify-center items-center'>
                                        <p className='text-red'>
                                            No Offers Found !
                                        </p>
                                    </div>
                                ) :
                                    (
                                        saleProducts?.results?.map((saleproduct, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="pl-4 basis-[45%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                                <OffersCard
                                                    imageSrc={saleproduct?.images[0]?.file}
                                                    brand={saleproduct?.brand.name}
                                                    productName={saleproduct?.name}
                                                />
                                            </CarouselItem>
                                        ))
                                    )
                            )
                        }
                    </CarouselContent>

                    {/* Navigation Arrows */}
                    <CarouselPrevious className=" hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
                    <CarouselNext className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
                </Carousel>
            </div>
        </section>
    )
}

export default OffersSection