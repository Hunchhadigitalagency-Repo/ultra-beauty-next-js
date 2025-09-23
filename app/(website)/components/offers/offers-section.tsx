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
import { AlertCircle } from 'lucide-react';


const OffersSection = () => {

    const { data: saleProducts, loading, error } = useFetchData<ProductResponse>(`products-on-sale/`)

    return (
        <section className="space-y-4 padding">
            <div className="flex items-center justify-between gap-4">
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
                                <div className='flex items-center justify-center w-full h-60'>
                                    <p className='font-extralight text-sm text-gray-400'>
                                        Loading Offers...
                                    </p>
                                </div>
                            ) : error ? (
                                <div className='flex flex-col items-center justify-center w-full h-60'>
                                    <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className='font-extralight text-sm text-gray-400'>
                                        Oops! Something went wrong...
                                    </p>
                                </div>
                            ) : (
                                saleProducts?.results?.length === 0 ? (
                                    <div className='flex flex-col items-center justify-center w-full h-60'>
                                        <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                                        <p className='font-extralight text-sm text-gray-400 capitalize'>
                                            Oops! no offers right now...
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
                                                    brand={saleproduct?.brand.brand_name}
                                                    productName={saleproduct?.name}
                                                    slugName={saleproduct?.slug_name}
                                                />
                                            </CarouselItem>
                                        ))
                                    )
                            )
                        }
                    </CarouselContent>

                    {/* Navigation Arrows */}
                    <CarouselPrevious className="absolute hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200  lg:flex -left-2 top-1/2 hover:bg-gray-50" />
                    <CarouselNext className="absolute hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex -right-2 top-1/2 hover:bg-gray-50" />
                </Carousel>
            </div>
        </section>
    )
}

export default OffersSection