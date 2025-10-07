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
import { toggleCategory } from "@/redux/features/category-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

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
    `dropdown/category/?is_not_empty=True/`
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCategoryCardClick = (categoryId: number) => {
    dispatch(toggleCategory({ id: categoryId, checked: true }));
    router.push(`/shop`);
  };

  return (
    <section className="space-y-4 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          className="max-w-[60%] sm:max-w-full"
          title="The Category"
          description="Find the list of category that you must have to glow"
        />
        <LinkText title="Glow Shop" href="/shop" />
      </div>
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center w-full h-60">
            <p className="font-extralight text-sm text-gray-400">
              Loading Categories...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center w-full h-60">
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className="font-extralight text-sm text-gray-400">
              Oops! Something went wrong...
            </p>
          </div>
        ) : data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-60">
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className="font-extralight text-sm text-gray-400 capitalize">
              Oops! no categories right now...
            </p>
          </div>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent className="-ml-4 gap-2">
              {data?.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[40%] pl-4 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6 xl:gap-2"
                >
                  <CategoryCard
                    id={category.id}
                    title={category.name}
                    image={category.icon}
                    onCategoryClick={handleCategoryCardClick}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex -left-2 top-1/2 hover:bg-gray-50" />
            <CarouselNext className="absolute hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex -right-2 top-1/2 hover:bg-gray-50" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
