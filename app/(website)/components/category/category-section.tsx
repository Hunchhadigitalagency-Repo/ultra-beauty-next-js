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
  { title: "Skin Care", image: "https://images.unsplash.com/photo-1710839006592-4fdfc6caca80?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Bridal Care", image: "https://images.unsplash.com/photo-1610276347233-2ab70fc71da8?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Make Up", image: "https://images.unsplash.com/photo-1608979048467-6194dabc6a3d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Child Care", image: "https://images.unsplash.com/photo-1533483595632-c5f0e57a1936?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { title: "Tools", image: "https://images.unsplash.com/photo-1600228390270-970186129936?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
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
