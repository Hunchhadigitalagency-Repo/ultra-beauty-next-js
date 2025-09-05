"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
} from "@/components/ui/carousel";

import CategoryCard from "./category-card";
import useFetchData from "@/hooks/use-fetch";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";

interface Category {
  id: number;
  name: string;
}
interface CategoryResponse {
  id: number;
  name: string;
  icon: string;
  subcategories: Category[];
}

const CategorySection: React.FunctionComponent = () => {

  const { data, loading, error } = useFetchData<CategoryResponse[]>(
    `dropdown/category?is_not_empty=True`
  );

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
        {loading ? (
          <p className="text-center text-muted-foreground text-sm">
            Loading Categories...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm font-medium">
            Something Went Wrong While Fetching Categories
          </p>
        ) : data?.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm">
            No Categories found
          </p>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="-ml-4">
              {data?.map((category, index) => (
                <CarouselItem
                  key={index}
                  className=" basis-[40%] pl-4 sm:basis-1/3 lg:basis-1/5"
                >
                  <CategoryCard title={category.name} image={category.icon} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className=" hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
            <CarouselNext className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-600 border-gray-200" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
