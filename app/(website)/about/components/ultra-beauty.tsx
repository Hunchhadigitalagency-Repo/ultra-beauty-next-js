"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi
} from "@/components/ui/carousel";
import { FaRegBell } from "react-icons/fa";
import image1 from "@/assets/Luxury-Beauty.png";
import Rectangle1 from "@/assets/Rectangle227.png";

const CATEGORY_LIST = [
  {
    title: "Something One",
    description:
      " Aesthetic and hygiene related functions. Cosmetic formulations often contain a combination of water, emollients, humectants,preservatives, fragrances, colorants, and active ingredients.",

  },
  {
    title: "Something Two",
    description:
      " Aesthetic and hygiene related functions. Cosmetic formulations often contain a combination of water, emollients, humectants,preservatives, fragrances, colorants, and active ingredients.",

  },
  {
    title: "Something Three",
    description:
      " Aesthetic and hygiene related functions. Cosmetic formulations often contain a combination of water, emollients, humectants,preservatives, fragrances, colorants, and active ingredients.",

  },
  {
    title: "Something Four",
    description:
      " Aesthetic and hygiene related functions. Cosmetic formulations often contain a combination of water, emollients, humectants,preservatives, fragrances, colorants, and active ingredients.",

  },
  {
    title: "Something Five",
    description:
      " Aesthetic and hygiene related functions. Cosmetic formulations often contain a combination of water, emollients, humectants,preservatives, fragrances, colorants, and active ingredients.",

  }
];

const UltraBeauty: React.FunctionComponent = () => {

  const noOfCategory = CATEGORY_LIST.length;

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
    <div
      className="w-full padding text-white my-25 xl:my-36 relative grid grid-cols-1 lg:grid-cols-[65%_35%] xl:grid-cols-[65%_35%]  gap-8 xl:min-h-[60vh] 2xl:min-h-[42vh] 2xl:grid-cols-[75%_25%]"
      style={{ backgroundImage: `url(${Rectangle1.src})` }}
    >
      <div className="w-full">
        <h1 className="py-5 text-xl font-bold text-center font-playfair lg:text-3xl text-primary md:text-left">
          We are Ultra Beauty & Brand
        </h1>
        <p className="text-sm tracking-tight text-justifymd:text-base">
          Cosmetic products are substances or preparations designed for
          application on the external parts of the human body such as the skin,
          hair, nails, lips, and teeth — with the primary purpose of cleansing,
          beautifying, enhancing appearance, or promoting attractiveness. These
          products do not alter the body&apos;s structure or physiological
          functions, distinguishing them from pharmaceutical or therapeutic
          agents.
        </p>

        <div className="w-full h-72 sm:h-56 md:h-60 lg:h-64">
          <Carousel setApi={setApi}
            opts={{ align: "start", loop: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CarouselContent className="mx-0 mt-1">
              {CATEGORY_LIST?.map((category, index) => (
                <CarouselItem
                  key={index}
                  className={`shrink-0 px-6
                  ${noOfCategory && noOfCategory <= 2
                      ? `basis-full md:basis-full xl:basis-1/2`
                      : 'basis-full xl:basis-[50%]'
                    }`}
                >
                  <div className="flex w-full gap-6 overflow-hidden mt-13">
                    <div className="bg-secondary text-foreground md:w-[86px] md:h-[86px] rounded-full flex justify-center items-center md:min-w-[86px] md:min-h-[86px] min-w-[60px] min-h-[60px] w-[60px] h-[60px]">
                      <FaRegBell className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="py-2 text-xl md:text-2xl font-playfair text-bold text-primary">
                        {category?.title}
                      </h3>
                      <p className="text-sm text-justify md:text-base md:tracking-tighter">
                        {category?.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
        </div>
      </div>
      <div className="absolute hidden lg:right-0 lg:-bottom-14 lg:block lg:w-1/3 xl:w-1/3 xl:-bottom-20 2xl:w-1/4">
        <Image className="w-full" src={image1} alt="Beauty Image" />
      </div>
    </div>
  );
};

export default UltraBeauty;
