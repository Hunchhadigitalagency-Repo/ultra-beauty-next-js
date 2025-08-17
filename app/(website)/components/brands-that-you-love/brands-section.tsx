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

  const { data } = useFetchData<BrandResponse>("/public-brands");
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
    <section className="padding space-y-9">
      <div className="flex justify-between gap-4 ">
        <SectionHeader
          title="Featured Brands"
          titleClassName="text-primary font-medium text-xl md:text-2xl xl:text3xl"
          description="Find the deals that are limited in offers"
        />
        <LinkText title="ALL BRANDS" href="/brands" />
      </div>
      {/* Brand Images section */}
      <div className="relative w-full">
        <Carousel setApi={setApi}
          opts={{ align: "start", loop: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <CarouselContent className="-ml-4">
            {brandDetails?.map((brand, index) => (
              <CarouselItem
                key={index}
                className="basis-[45%]  pl-4 sm:basis-1/2 md:basis-[32%] lg:basis-1/4"
              >
                <BrandsCard image={brand.brand_image} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BrandsSection;
