"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem
} from "@/components/ui/carousel";

import CategoryCard from "./category-card";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";

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

const CategorySection: React.FunctionComponent = () => {

  return (
    <section className="padding space-y-4">
      <div className="flex justify-between items-center gap-4">
        <SectionHeader
          className="max-w-[200px] sm:max-w-full"
          title="The Category"
          titleClassName="font-playfair"
          description="Find the list of category that you must have to glow"
        />
        <LinkText title="Glow Shop" href="/shop" />
      </div>
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: 'start'
          }}
        >
          <CarouselContent className="-ml-4">
            {CATEGORY_LIST.map((category, index) => (
              <CarouselItem
                key={index}
                className=" basis-[40%] pl-4 sm:basis-1/3 lg:basis-1/5"
              >
                <CategoryCard title={category.title} image={category.image} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className=" hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
          <CarouselNext className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategorySection;
