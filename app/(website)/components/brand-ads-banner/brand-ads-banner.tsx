"use client"

import React from 'react';
import { AlertCircle } from "lucide-react";
import useFetchData from '@/hooks/use-fetch';
import { BannerResponse } from '@/types/banner';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const BrandAdsBanner: React.FunctionComponent = () => {

    const { data, loading, error } = useFetchData<BannerResponse[]>(`cms/advertisment-banners/?position=Single%20Banner`)

    return (
        <div className='padding'>
            {
                loading ?
                    (
                        <div className='h-60 flex w-full justify-center items-center'>
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
                                    <CarouselContent className='h-full w-full'>
                                        {
                                            data?.map((banner) => (
                                                <CarouselItem key={banner.id}>
                                                    <Card className="rounded-md overflow-hidden">
                                                        <CardContent className="p-0">
                                                            <div
                                                                className="w-full h-60 md:h-80 lg:h-[563px]"
                                                                style={{
                                                                    backgroundImage: `url(${banner.image})`,
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center",
                                                                }}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </CarouselItem>
                                            ))
                                        }
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>

                            )
            }
        </div>
    );
};

export default BrandAdsBanner;
