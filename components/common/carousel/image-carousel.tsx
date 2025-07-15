"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// ⭐ Helper to render stars
const getStars = (count: number) => "⭐".repeat(count);

// Slides with ratings
const slides = [
  {
    id: 1,
    imageOurs:
      "https://img.freepik.com/free-photo/3d-rendering-minimalist-interior-with-copy-space_23-2150943518.jpg",
    imageOthers:
      "https://img.freepik.com/free-photo/3d-rendering-minimalist-interior-with-copy-space_23-2150943518.jpg",
    ratingOurs: {
      comfort: 5,
      material: 4,
    },
    ratingOthers: {
      comfort: 3,
      material: 2,
    },
  },
  {
    id: 2,
    imageOurs:
      "https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg",
    imageOthers:
      "https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg",
    ratingOurs: {
      comfort: 4,
      material: 4,
    },
    ratingOthers: {
      comfort: 2,
      material: 2,
    },
  },
  {
    id: 3,
    imageOurs:
      "https://img.freepik.com/premium-photo/white-leather-sofa-is-featured-white-room_922357-34145.jpg",
    imageOthers:
      "https://img.freepik.com/premium-photo/white-leather-sofa-is-featured-white-room_922357-34145.jpg",
    ratingOurs: {
      comfort: 5,
      material: 5,
    },
    ratingOthers: {
      comfort: 3,
      material: 3,
    },
  },
];

export default function ImageCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Track active slide
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    if (!api || isHovered) return;
    const interval = setInterval(() => api.scrollNext(), 10000);
    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section className="relative w-full overflow-hidden padding">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{ align: "start", loop: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CarouselContent className="h-[442px]">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full w-full basis-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.imageOurs}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                  {slides.map((_, slideIndex) => (
                    <button
                      key={slideIndex}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${slideIndex === current
                          ? "bg-orange-500 scale-110"
                          : "bg-white/50 hover:bg-white/70"
                        }`}
                      onClick={() => api?.scrollTo(slideIndex)}
                      aria-label={`Go to slide ${slideIndex + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Ratings Section */}
              <div className="bg-white/90 backdrop-blur-sm mt-2 px-4 py-3 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Ours */}
                <div className="text-left">
                  <h4 className="font-semibold text-blue-700 mb-1">Ours</h4>
                  <p className="text-sm text-gray-600">
                    Comfort:{" "}
                    <span className="text-yellow-500">
                      {getStars(slide.ratingOurs.comfort)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Material:{" "}
                    <span className="text-yellow-500">
                      {getStars(slide.ratingOurs.material)}
                    </span>
                  </p>
                </div>

                {/* Others */}
                <div className="text-right">
                  <h4 className="font-semibold text-red-600 mb-1">Others</h4>
                  <p className="text-sm text-gray-600">
                    Comfort:{" "}
                    <span className="text-yellow-400">
                      {getStars(slide.ratingOthers.comfort)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Material:{" "}
                    <span className="text-yellow-400">
                      {getStars(slide.ratingOthers.material)}
                    </span>
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
