"use client";

import { useEffect, useState } from "react";
import image1 from "@/assets/Rectangle 11.png"
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "",
    description: "",
    image: image1,
    buttonText: "",
  },
  {
    id: 2,
    title: "Transform Your Workspace",
    description:
      "Experience the perfect blend of style and functionality. Our premium collection brings comfort and elegance to every corner of your office space.",
    image: "https://img.freepik.com/premium-photo/clean-coworking-office-interior-with-concrete-wall-wooden-flooring-windows-with-city-view-sunlight-shadows-furniture-3d-rendering_670147-71922.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    buttonText: "EXPLORE COLLECTION",
  },
  {
    id: 3,
    title: "Wellness Meets Design",
    description:
      "Prioritize health without compromising aesthetics. Our wellness-focused furniture elevates your productivity with mindful comfort and modern design.",
    image: "https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    buttonText: "DISCOVER MORE",
  },
];

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api || isHovered) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section className="relative h-[400px] px-5 py-10 padding-x bg-[#FAFAFA] sm:h-[500px] lg:h-[calc(100vh-130px)]">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{ align: "start", loop: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className="h-[400px] sm:h-[500px] lg:h-[calc(100vh-130px)]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full overflow-hidden rounded-md ">
              <div className="relative  w-[1403px] h-[80%] overflow-hidden rounded-md ">
                <div className="absolute inset-0 ">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt=""
                    fill
                    className=" object-cover rounded-md "
                    priority={index === 0}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-2 flex flex-row ">
          <CarouselPrevious className="absolute w-[17px] hidden lg:flex text-[#333333] left-4 border-none shadow-none bg-transparent" />
          <CarouselNext className="absolute w-[17px] hidden lg:flex text-[#333333] left-16 border-none shadow-none bg-transparent" />
        </div>

        <div className="absolute bottom-2 right-3 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-[10px] h-[10px]  rounded-full transition-all duration-300 ${i === current
                ? "bg-red-500 scale-110 h-[10px] w-[15px]"
                : "bg-[#7A7A7A] hover:bg-white/70"
                }`}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
