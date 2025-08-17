"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LinkText from "@/components/common/header/link-text";
import ProductCard from "@/components/common/cards/product-card";
import SectionHeader from "@/components/common/header/section-header";
import { Result } from "@/types/product";

// type Product = {
//     id: number;
//     imageSrc: string;
//     alt: string;
//     title: string;
//     description: string;
//     brand: string;
//     rating: number;
//     price: string;
// };

type Product = {
  id: number;
  name: string;
  price: string;
  images: [
    {
      id: number;
      file: string;
      file_type: string;
      created_at: string;
      updated_at: string;
    }
  ];
  average_rating: number;
  flash_sale_discount: string;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
};

interface ProductResponse extends Result {
  id: number;
}
interface ProductSectionProps {
  headerTitle: string;
  headerDescription: string;
  headerLink: string;
  isLoading: boolean;
  error: any;
  products: ProductResponse[] | null;
}

const ProductSection: React.FunctionComponent<ProductSectionProps> = ({
  headerTitle,
  headerDescription,
  headerLink,
  products,
  isLoading,
  error
}) => {
  return (
    <section className="space-y-4 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          className="max-w-[200px] sm:max-w-full"
          title={headerTitle}
          titleClassName="font-playfair"
          description={headerDescription}
        />
        <LinkText title="Glow Shop" href={headerLink} />
      </div>
      <div className="relative">
          {isLoading ? (
          <p className="text-sm text-center text-muted-foreground">
            Loading Categories...
          </p>
        ) : error ? (
          <p className="text-sm font-medium text-center text-red-500">
            Something Went Wrong While Fetching Categories
          </p>
        ) : products?.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground">
            No Categories found
          </p>
        ) :(<Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products?.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 h-full basis-[45%] sm:basis-1/2 md:basis-1/2 lg:basis-1/4"
              >
                <ProductCard
                  imageSrc={product.images?.[0]?.file}
                  brand={product.brand}
                  alt={product.name}
                  title={product.name}
                  price={product.price}
                  rating={product.average_rating}
                  slug={product.slug_name}
                  isFlashSale= {product.is_flash_sale}
                  isNew = {product.is_new}
                  discountTag={product.flash_sale_discount}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <CarouselPrevious className="absolute hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200  lg:flex -left-2 top-1/2 hover:bg-gray-50" />
          <CarouselNext className="absolute hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex -right-2 top-1/2 hover:bg-gray-50" />
        </Carousel>)}
        
      </div>
    </section>
  );
};

export default ProductSection;
