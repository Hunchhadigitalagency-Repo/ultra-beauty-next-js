"use client";

import BrandsCard from "./brands-card";
import useFetchData from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi
} from "@/components/ui/carousel";
import { AlertCircle } from "lucide-react";

export interface Link {
  next: string;
  previous: string;
}

export interface BrandResponse {
  links: Link;
  count: number;
  page_size: number;
  total_pages: number;
  current_page: number;
  results: Brand[]
}

export interface Brand {
  id: number
  brand_name: string
  brand_image: string
  description?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  is_deleted: boolean
}
const BrandsSection: React.FunctionComponent = () => {

  const { data, loading, error } = useFetchData<BrandResponse>("/public-brands/?is_featured=true");
  const brandDetails = data?.results
  const noOfBrands = Number(brandDetails?.length)

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
    <section className="space-y-4 padding">
      <div className="flex justify-between gap-4 ">
        <SectionHeader
          title="Featured Brands"
          description="Find the deals that are limited in offers"
        />
        <LinkText title="ALL BRANDS" href="/brands" />
      </div>
      {/* Brand Images section */}
      <div className="relative w-full">
        {loading ? (
          <div className='flex items-center justify-center w-full h-60'>
            <p className='font-extralight text-sm text-gray-400'>
              Loading Featured Brands...
            </p>
          </div>
        ) : error ? (
          <div className='flex flex-col items-center justify-center w-full h-60'>
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className='font-extralight text-sm text-gray-400'>
              Oops! Something went wrong...
            </p>
          </div>
        ) : data?.results.length === 0 ? (
          <div className='flex flex-col items-center justify-center w-full h-60'>
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className='font-extralight text-sm text-gray-400 capitalize'>
              Oops! no featured brands right now...
            </p>
          </div>
        ) : (
          <Carousel setApi={setApi}
            opts={{ align: "start", loop: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <CarouselContent className="mt-1 -ml-4">
              {brandDetails?.map((brand, index) => (
                <CarouselItem
                  key={index}
                  className={`${noOfBrands && noOfBrands <= 6 ? `basis-1/2 sm:basis-[25%] md:basis-[33%] lg:basis-1/${noOfBrands}` : 'basis-1/2 sm:basis-[25%] md:basis-[33%] xl:basis-[25%]'}`}
                >
                  <BrandsCard image={brand.brand_image} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>)}
      </div>
    </section>
  );
};

export default BrandsSection;
