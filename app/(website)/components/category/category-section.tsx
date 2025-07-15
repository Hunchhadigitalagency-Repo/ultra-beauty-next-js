"use client";
import React, { useEffect, useState } from "react";
import CategoryCard from "./category-card";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext, CarouselItem, CarouselApi } from "@/components/ui/carousel";

const CATEGORY_LIST = [
  { title: "Skin Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Bridal Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Make Up", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Child Care", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
  { title: "Tools", image: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g" },
]

const CategorySection = () => {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api, isHovered]);

  return (
    <section className="padding space-y-4">
      <div className="flex justify-between gap-4">
        <SectionHeader
          title="The Category"
          titleClassName="font-playfair"
          description="Find the list of category that you must have to glow"
        />
        <LinkText title="Glow Shop" href="/shop" />
      </div>
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
          <CarouselContent className="-ml-1 md:-ml-2">
            {CATEGORY_LIST.map((category, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/5"
              >
                <CategoryCard title={category.title} image={category.image} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
          <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
        </Carousel>
      </div>
      {/* Page indicator */}
      <div className="flex items-center justify-center mt-6">
        <p className="text-xl text-gray-500">
          {String(current).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
};

export default CategorySection;
