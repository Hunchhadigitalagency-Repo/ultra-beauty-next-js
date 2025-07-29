import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
];

const UltraBeauty: React.FunctionComponent = () => {

  return (
    <div
      className=" w-full padding text-white bg-contain my-25 relative"
      style={{ backgroundImage: `url(${Rectangle1.src})` }}
    >
      <div className="w-full lg:w-[60%]  ">
        <h1 className="font-playfair lg:text-3xl text-xl font-bold text-primary py-5 text-center md:text-left">
          We are Ultra Beauty & Brand
        </h1>
        <p className=" text-sm md:text-base tracking-tight text-justify ">
          Cosmetic products are substances or preparations designed for
          application on the external parts of the human body such as the skin,
          hair, nails, lips, and teeth — with the primary purpose of cleansing,
          beautifying, enhancing appearance, or promoting attractiveness. These
          products do not alter the body&apos;s structure or physiological
          functions, distinguishing them from pharmaceutical or therapeutic
          agents.
        </p>

        <div className="w-full h-60 ">
          <Carousel className="w-full " opts={{ align: 'start' }}>
            <div className="absolute bottom-0 right-10 flex space-x-2 z-10">
              <CarouselPrevious className="flex lg:hidden bg-transparent border-0 hover:bg-transparent hover:text-foreground shadow-none" />
              <CarouselNext className="flex lg:hidden bg-transparent border-0 hover:bg-transparent hover:text-foreground shadow-none" />
            </div>
            <CarouselContent className="-ml-1 lg:-ml-4 w-full">
              {CATEGORY_LIST.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/2 pl-4  "
                >
                  <div className="w-full flex gap-4  mt-13">
                    <div className="bg-secondary text-foreground  md:w-[86px] md:h-[86px] rounded-full flex justify-center items-center md:min-w-[86px] md:min-h-[86px] min-w-[60px] min-h-[60px] w-[60px] h-[60px]">
                      <FaRegBell className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-playfair text-bold text-primary py-2 ">
                        {category.title}
                      </h3>
                      <p className=" text-sm md:text-base md:tracking-tighter text-justify">
                        {category.description}
                      </p>
                    </div>
                  </div>

                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="absolute md:right-0 lg:right-0 lg:-bottom-30  hidden lg:block lg:w-1/3  ">
          <Image src={image1} alt="Beauty Image" />
        </div>
      </div>
    </div>
  );
};

export default UltraBeauty;
