'use client'
import useFetchData from '@/hooks/use-fetch';
import TestimonialCard from './testimonial-card';
import React, { useEffect, useState } from 'react';
import SectionHeader from '@/components/common/header/section-header';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { AlertCircle } from 'lucide-react';

interface TestimonialResponse {

    id?: number
    name: string
    company?: string
    designation?: string
    message: string
    image: string
    rating: number
    is_active?: boolean
    slug?: any
    created_at?: string
}

const Testimonial = () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const { data, loading, error } = useFetchData<TestimonialResponse[]>('cms/testimonials/?pagination=false')

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
        <section className='w-full h-full pb-8 space-y-8'>
            <SectionHeader className='padding-x'
                title='Testimonial'
                description='Here are the review of customers.'
            />
            {loading ? (
                <div className='flex items-center justify-center w-full h-60'>
                    <p className='font-semibold text-base text-gray-400'>
                        Loading Testimonials...
                    </p>
                </div>
            ) : error ? (
                <div className='flex flex-col items-center justify-center w-full h-60'>
                    <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                    <p className='text-base font-semibold text-gray-400'>
                        Oops! Something went wrong...
                    </p>
                </div>
            ) : data?.length === 0 ? (
                <div className='flex flex-col items-center justify-center w-full h-60'>
                    <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                    <p className='text-base font-semibold text-gray-400 capitalize'>
                        Oops! no testimonials right now...
                    </p>
                </div>
            ) : (
                <div className="relative w-full">
                    <Carousel setApi={setApi}
                        opts={{ align: "start", loop: true }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <CarouselContent>
                            {data?.map((detail, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-[75%]  md:basis-1/2 xl:basis-[40%]"
                                >
                                    <TestimonialCard

                                        image={detail.image}
                                        name={detail.name}
                                        rating={detail.rating}
                                        message={detail.message}
                                        designation={detail.designation}
                                        company={detail.company}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            )}
            {/* Slider */}
            <div className="flex items-center justify-center gap-2">
                {data?.map((_, i) => (
                    <button
                        key={i}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${i === current
                            ? "bg-primary scale-110 w-3 h-1 md:w-4 xl:h-[10px]"
                            : "bg-[#CFCECE] hover:bg-white/70"
                            }`}
                        onClick={() => api?.scrollTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}

            </div>
        </section>
    )
}

export default Testimonial