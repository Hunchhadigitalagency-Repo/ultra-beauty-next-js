"use client";

import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import TestimonialCard from "../cards/testimonial-card";
import { ITestimonial } from "@/types/cms";
import useFetchData from "@/hooks/use-fetch";



export default function TestimonialCarousel() {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  const {
    data: TESTIMONIALS,
    isLoading:loading,
    error
  } = useFetchData<ITestimonial[]>('cms/testimonials/?pagination=false');


  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [api, isHovered]);

  if (loading) return <p className="text-sm text-center text-muted-foreground">Loading...</p>;
  if (error) return <p className="text-sm font-medium text-center text-red-500">
    Something Went Wrong While Fetching FAQs
  </p>

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {TESTIMONIALS?.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="absolute text-gray-600 -translate-y-1/2 bg-white border-gray-200 -left-4 top-1/2 hover:bg-gray-50" />
        <CarouselNext className="absolute text-gray-600 -translate-y-1/2 bg-white border-gray-200 -right-4 top-1/2 hover:bg-gray-50" />
      </Carousel>

      {/* Page indicator */}
      <div className="flex items-center justify-center mt-6">
        <p className="text-xl text-gray-500">
          {String(current).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
