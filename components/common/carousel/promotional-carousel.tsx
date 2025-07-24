"use client";

import Image from "next/image";
import { Tag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import subtractImage from "@/assets/Subtract.png";

const slides = [
  {
    id: 1,
    title: "The Perfect Balance of Comfort and Style",
    image:
      "https://img.freepik.com/free-photo/minimalist-desk-arrangement-with-laptop-top-view_23-2149073044.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    promotion: {
      subtitle: "In your First Book",
      discount: "20% OFF",
      code: "FIRST20",
      validUntil: "Valid till Jun 21, 2025",
    },
  },
  {
    id: 2,
    title: "Discover Your Next Favorite Read",
    image:
      "https://img.freepik.com/free-photo/minimalist-desk-arrangement-with-laptop-top-view_23-2149073044.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    promotion: {
      subtitle: "Summer Reading Sale",
      discount: "30% OFF",
      code: "SUMMER30",
      validUntil: "Valid till Aug 31, 2025",
    },
  },
  {
    id: 3,
    title: "Transform Your Reading Experience",
    image:
      "https://img.freepik.com/free-photo/minimalist-desk-arrangement-with-laptop-top-view_23-2149073044.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740",
    promotion: {
      subtitle: "Premium Collection",
      discount: "15% OFF",
      code: "PREMIUM15",
      validUntil: "Valid till Dec 31, 2025",
    },
  },
];

interface PromotionalCarouselProps {
  className?: string;
}

export default function PromotionalCarousel({ className }: PromotionalCarouselProps) {
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
    }, 5000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <div className={`w-full ${className}`}>
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
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden bg-gray-900">
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt="Promotional background"
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content overlay */}
                <div className="relative flex flex-col lg:flex-row z-10 h-40 lg:h-full items-center gap-5 md:gap-9 justify-between p-3 md:p-12">
                  {/* Left side - Main title */}
                  <div className="flex-1 max-w-full">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      {slide.title}
                    </h1>
                  </div>

                  {/* Right side - Promotional ticket */}
                  <div className="relative w-full flex justify-center items-center md:w-auto ml-0 md:ml-6">
                    {/* Ticket shape background */}
                    <div
                      className="relative rounded-2xl flex justify-start bg-center items-center px-24 py-12 shadow-2xl w-full h-[170px]  md:w-[596px] md:h-[234px]"
                      style={{ backgroundImage: `url(${subtractImage.src})` }}
                    >
                      {/* Ticket content */}
                      <div className="flex justify-between items-center flex-col gap-2 md:gap-5 lg:gap-8">
                        <div className="text-left space-y-2 text-foreground">
                          <p className="text-sm  font-medium">
                            {slide.promotion.subtitle}
                          </p>
                          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                            {slide.promotion.discount}
                          </div>
                        </div>

                        <div className="text-left">
                          <div className="py-1 rounded-md">
                            <code className="text-xl  font-semibold ">
                              {slide.promotion.code}
                            </code>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {slide.promotion.validUntil}
                          </p>
                        </div>
                      </div>

                      {/* Red circular icon */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <Tag className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation dots - positioned inside the image at the bottom */}
                <div className="absolute bottom-6  left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                          ? "bg-orange-400 scale-110"
                          : "bg-white/50 hover:bg-white/70"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
