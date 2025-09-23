'use client';
import useFetchData from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react';
import MainBrandcard from './main-section-brand-card';
import LinkText from '@/components/common/header/link-text';
import brandsHeroImage from "@/assets/temp-images/aboutusbg.png";
import SectionHeader from '@/components/common/header/section-header';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { AlertCircle } from 'lucide-react';

interface Link {
    next: string;
    previous: string;
}

interface BrandResponse {
    links: Link;
    count: number;
    page_size: number;
    total_pages: number;
    current_page: number;
    results: Brand[]
}

interface Brand {
    id: number
    brand_name: string
    brand_image: string
    description?: string
    is_featured: boolean
    is_active: boolean
    created_at: string
    updated_at: string
}

const BrandsSection: React.FunctionComponent = () => {

    const { data, loading, error } = useFetchData<BrandResponse>("/public-brands");
    const brandDetails = data?.results

    const [api, setApi] = useState<CarouselApi>();
    const [, setCurrent] = useState(0);
    const [, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    useEffect(() => {
        if (!api || isHovered) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 2000);

        return () => clearInterval(interval);
    }, [api, isHovered]);

    return (
        <section className="padding-y">
            <div className="relative min-h-56 md:min-h-[400px] z-30 w-full bg-cover"
                style={{
                    backgroundImage: `url(${brandsHeroImage.src})`,
                }}>
                <div className='absolute inset-0 bg-black/40'>
                    {/* main section */}
                    <div className='padding-y grid grid-cols-[40%_60%] lg:grid-cols-[40%_60%]  overflow-hidden z-10'>
                        {/* Left - Text Content */}
                        <div className='flex flex-col items-start justify-center gap-6 padding-x'>
                            <SectionHeader
                                titleClassName='text-primary text-xl xl:text-2xl '
                                descriptionClassName='hidden md:block font-poppins text-white text-xs sm:text-sm md:text-sm lg:text-base'
                                title="Brands We Carriee"
                                description="Here is the brand we carrie"
                            />
                            <p className="hidden md:block text-white text-sm md:text-sm lg:text-base max-w-[500px] font-poppins">
                                Laptops and the playstation 5(PS5) represents two powerful branches of modern technology-productivity and entertainment-and each designed to meet very different needs yet often.
                            </p>
                            <button className="hidden md:block bg-primary text-white px-5 py-1 md:px-10 md:py-2.5 lg:px-14 lg:py-3 text-xs sm:text-sm md:text-sm lg:text-base  rounded-full   border border-white shadow-white ">
                                Shop Now
                            </button>
                        </div>

                        {/* Right - Brand Carousel */}

                        {loading ? (
                            <div className='flex items-center justify-center w-full h-60'>
                                <p className='font-semibold text-base text-gray-400'>
                                    Loading Brands Carousels...
                                </p>
                            </div>
                        ) : error ? (
                            <div className='flex flex-col items-center justify-center w-full h-60'>
                                <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                                <p className='text-base font-semibold text-gray-400'>
                                    Oops! Something went wrong...
                                </p>
                            </div>
                        ) : data?.results.length === 0 ? (
                            <div className='flex flex-col items-center justify-center w-full h-60'>
                                <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                                <p className='text-base font-semibold text-gray-400 capitalize'>
                                    Oops! no brands carousel right now...
                                </p>
                            </div>
                        ) : (
                            <div className="w-full md:pb-14">
                                <div className='flex justify-end py-4 mr-4 sm:mr-8 md:mr-16'>
                                    <LinkText className='text-xs text-white hover:text-secondary'
                                        title="ALL BRANDS"
                                        href="/shop" />
                                </div>
                                <Carousel
                                    setApi={setApi}
                                    opts={{ align: "start", loop: true }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>
                                    <CarouselContent
                                        className="flex gap-5 sm:gap-6 md:gap-7">
                                        {brandDetails?.map((brand, index) => (
                                            <CarouselItem
                                                key={index}
                                                className="basis-1/2 md:basis-[35%] lg:basis-[40%] "
                                            >
                                                <MainBrandcard image={brand?.brand_image} />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </div>)}
                    </div>

                </div>
            </div>
        </section>
    )
}


export default BrandsSection