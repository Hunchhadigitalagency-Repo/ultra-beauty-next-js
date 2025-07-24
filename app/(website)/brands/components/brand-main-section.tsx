'use client'
import React from 'react';
import moira from "@/assets/MORIA.png";
import letan from "@/assets/LeTan.png";
import urban from "@/assets/URBAN.png";
import australis from "@/assets/australis.png";
import brandsHeroImage from "@/assets/brandsCareer.png"
import MainBrandcard from './main-section-brand-card';
import LinkText from '@/components/common/header/link-text';
import SectionHeader from '@/components/common/header/section-header';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const BRANDS_LIST = [
    { image: moira },
    { image: letan },
    { image: urban },
    { image: australis }
];

const BrandsSection = () => {

    return (
        <section className="padding-y">
            <div className="relative min-h-[150px] md:min-h-[400px] z-30 w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${brandsHeroImage.src})`,
                }}>
                <div className='absolute inset-0 bg-black/40'>
                    {/* main section */}
                    <div className='padding-y grid grid-cols-2 lg:grid-cols-[40%_60%]  overflow-hidden z-10'>
                        {/* Left - Text Content */}
                        <div className='flex flex-col justify-center items-start padding-x gap-6'>
                            <SectionHeader
                                titleClassName='font-playfair text-primary text-xl xl:text-2xl'
                                descriptionClassName='hidden md:block font-poppins text-white text-xs sm:text-sm md:text-sm lg:text-base'
                                title="Brands We Carriee"
                                description="Here is the brand we carrie"
                            />
                            <p className="hidden md:block text-white text-sm md:text-sm lg:text-base max-w-[500px] font-poppins">
                                The major cosmetic product brands and what makes them stand out. These brands operate in various segments of the beauty industry—skincare, makeup, haircare and fragrance—and cater to different customers’ needs, price ranges, and global markets.
                            </p>
                            <button className="hidden md:block bg-[#FF2B5F] px-5 py-1 md:px-10 md:py-2.5 lg:px-14 lg:py-3 text-xs sm:text-sm md:text-sm lg:text-base  rounded-full text-white font-poppins border border-white shadow-white">
                                Shop now
                            </button>
                        </div>

                        {/* Right - Brand Carousel */}
                        <div className="w-full  md:pb-14">
                            <div className='flex justify-end mr-4  sm:mr-8 md:mr-16 py-3'>
                                <LinkText className='text-white text-xs' title="ALL BRANDS" href="/shop" />
                            </div>
                            <Carousel>
                                <CarouselContent className="flex gap-4 sm:gap-6 md:gap-7">
                                    {BRANDS_LIST.map((brand, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="basis-1/2 md:basis-[35%] lg:basis-[40%]"
                                        >
                                            <MainBrandcard image={brand.image} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>

                </div>
            </div>


        </section>
    )
}


export default BrandsSection