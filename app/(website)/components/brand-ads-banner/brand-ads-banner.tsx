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

    const { data, loading, error } = useFetchData<BannerResponse[]>(`cms/advertisment-banners/?position=Single%20Banner`)

    console.log(data, "banner brands")
    return (
        <div className='padding'>
            {
                loading ?
                    (<div className='h-60 flex w-full justify-center items-center'>
                        <p className='text-gray'>
                            Loading Brand Ads Banner...
                        </p>
                    </div>

                    ) :
                    error ?
                        (
                            <div className='h-60 flex flex-col w-full justify-center items-center'>
                                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                                <p className='text-red'>
                                    Error Fetching Brand Ads Banners !
                                </p>
                            </div>
                        ) :
                        data?.length === 0 ?
                            (
                                <div className='h-60 flex flex-col w-full justify-center items-center'>
                                    <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                                    <p className='text-red'>
                                        No Brand Ads Banners Found !
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
                                                    className='flex justify-center items-center'
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
