"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "Redefining Comfort at Work",
    image:
      "https://img.freepik.com/free-photo/3d-rendering-minimalist-interior-with-copy-space_23-2150943518.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    buttonText: "SHOP OFFERS",
  },
  {
    id: 2,
    title: "Transform Your Workspace",

    image:
      "https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    buttonText: "EXPLORE COLLECTION",
  },
  {
    id: 3,
    title: "Wellness Meets Design",

    image: "https://img.freepik.com/premium-photo/white-leather-sofa-is-featured-white-room_922357-34145.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    buttonText: "DISCOVER MORE",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section className="relative overflow-hidden padding">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className=" h-[300px] md:h-[442px]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt="Modern workspace with plants and ergonomic furniture"
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 " />
                </div>

                {/* Content */}
                <div className="relative z-10 px-8 h-full flex items-center justify-start max-w-lg">
                  <div className="  space-y-4">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl  font-bold leading-snug  text-primary">
                      {slide.title}
                    </h1>

                    <Button
                      size="lg"
                      className="bg-green text-[14px] md:text-[17px] font-semibold rounded-full w-[220px] h-10 md:w-[250px] md:h-13 hover:bg-green-600"
                    >
                      {slide.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Slide Indicators - positioned inside the image */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                  {slides.map((_, slideIndex) => (
                    <button
                      key={slideIndex}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        slideIndex === current
                          ? "bg-orange-500 scale-110"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                      onClick={() => api?.scrollTo(slideIndex)}
                      aria-label={`Go to slide ${slideIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
