"use client"

import React from 'react';
import { AlertCircle } from "lucide-react";
import useFetchData from '@/hooks/use-fetch';
import { BannerResponse } from '@/types/banner';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const BrandAdsBanner: React.FunctionComponent = () => {

    const { data, loading, error } = useFetchData<BannerResponse[]>(`cms/advertisment-banners-dropdown/?position=Single%20Banner`)

    return (
        <div className='padding'>
            {
                loading ?
                    (<div className='flex items-center justify-center w-full h-60'>
                        <p className='font-semibold text-base text-gray-400'>
                            Loading Brand Ads Banners...
                        </p>
                    </div>
                    ) :
                    error ?
                        (
                            <div className='flex flex-col items-center justify-center w-full h-60'>
                                <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                                <p className='text-base font-semibold text-gray-400'>
                                    Oops! Something went wrong...
                                </p>
                            </div>
                        ) :
                        data?.length === 0 ?
                            (
                                <div className='flex flex-col items-center justify-center w-full h-60'>
                                    <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                                    <p className='text-base font-semibold text-gray-400 capitalize'>
                                        Oops! no brand ads banners right now...
                                    </p>
                                </div>
                            ) :
                            (
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {
                                            data?.map((banner, index) => (
                                                <CarouselItem
                                                    key={index}
                                                    className='flex items-center justify-center'
                                                >
                                                    <div
                                                        className="h-52 w-[325px] sm:w-full sm:h-60 md:h-80 lg:h-[563px] rounded-xl shadow-md"
                                                        style={{
                                                            backgroundImage: `url(${banner.image})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                        }}
                                                    />
                                                </CarouselItem>
                                            ))
                                        }
                                    </CarouselContent>
                                    <CarouselPrevious className='mx-10 sm:mx-2 md:mx-2 lg:m-0' />
                                    <CarouselNext className='mx-10 sm:mx-2 md:mx-2 lg:m-0' />
                                </Carousel>
                            )
            }
        </div >
    );
};

export default BrandAdsBanner;
