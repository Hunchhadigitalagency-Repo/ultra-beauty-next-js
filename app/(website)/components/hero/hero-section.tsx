"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
    description:"",
    image: image1,
    buttonText: "",
  },
  {
    id: 2,
    title: "Transform Your Workspace",
    description:
      "Experience the perfect blend of style and functionality. Our premium collection brings comfort and elegance to every corner of your office space.",
    image: image1,
    buttonText: "EXPLORE COLLECTION",
  },
  {
    id: 3,
    title: "Wellness Meets Design",
    description:
      "Prioritize health without compromising aesthetics. Our wellness-focused furniture elevates your productivity with mindful comfort and modern design.",
    image: image1,
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
    <section className="relative h-[400px] sm:h-[500px] lg:h-[calc(100vh-130px)]">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{ align: "start", loop: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className="h-[400px] mx-auto sm:h-[500px] lg:h-[calc(100vh-130px)]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    fill
                    className=" w-[1403px] h-[519px]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* <div className="relative z-10 container mx-auto h-full flex items-center justify-center px-4 sm:px-6 md:px-10">
                  <div className="text-white text-center max-w-lg sm:max-w-xl lg:max-w-4xl space-y-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg font-medium opacity-90">
                      {slide.description}
                    </p>
                    <Button
                      size="sm"
                      className="text-sm font-semibold rounded-full w-[200] md:w-[300] h-8 md:h-10 px-6 sm:px-8 py-2 sm:py-3 bg-[#FF9900] text-black hover:bg-[#e3a900]"
                    >
                      {slide.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className=" absolute -bottom-5  flex flex-row justify-center items-center">
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-white/30 text-white border-white/20 rounded-full" />
        <CarouselNext className="absolute left-16 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover: text-white border-white/20 rounded-full" />
        </div>

        <div className="absolute -bottom-5 right-3 -translate-x-1/2 z-20 flex space-x-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`w-3 h-3  rounded-full transition-all duration-300 ${i === current
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
