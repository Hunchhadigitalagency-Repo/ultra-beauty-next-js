"use client";
import moira from "@/assets/MORIA.png";
import letan from "@/assets/LeTan.png";
import urban from "@/assets/URBAN.png";
import BrandsCard from "./brands-card";
import australis from "@/assets/australis.png";
import React, { useEffect, useState } from "react";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi
} from "@/components/ui/carousel";

const BRANDS_LIST = [
  { image: australis },
  { image: moira },
  { image: letan },
  { image: urban },
  { image: australis },
  { image: moira },
  { image: letan },
  { image: urban },
];

const BrandsSection = () => {
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
      <div className="flex justify-between gap-4">
        <SectionHeader
          title="Brands That You Love"
          titleClassName="font-playfair text-[#333333]"
          description="Find the list of category that you must have to glow"
        />
        <LinkText title="ALL BRANDS" href="/brands"/>
      </div>
{/* Brand Images section */}
      <div className="relative w-full">
        <Carousel setApi={setApi}
          opts={{ align: "start", loop: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <CarouselContent className="flex gap-7">
            {BRANDS_LIST.map((brand, index) => (
              <CarouselItem
                key={index}
                className="basis-[45%]  sm:basis-1/2 md:basis-[32%] lg:basis-[23%]"
              >
                <BrandsCard image={brand.image}/>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BrandsSection;
