"use client"
import React, { useState } from 'react';
import { Result } from '@/types/product';
import { useAppSelector } from '@/redux/hooks';
import LinkText from '@/components/common/header/link-text';
import { useToggleWishlist } from '@/utils/wishList-utility';
import ProductCard from '@/components/common/cards/product-card';
import SectionHeader from '@/components/common/header/section-header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

interface ProductResponse extends Result {
  id: number
}

interface ProductSectionProps {
  headerTitle: string;
  headerDescription: string;
  buttonText?: string;
  headerLink: string;
  products: ProductResponse[] | null;
  isLoading?: boolean;
  error?: Error | null;

}

const ProductSection: React.FunctionComponent<ProductSectionProps> = ({ headerTitle, headerDescription, headerLink, products, buttonText, isLoading, error }) => {

  const toggleWishlist = useToggleWishlist();
  const { isLoggedIn } = useAppSelector((state) => state.authentication)
  const [isWishlisted, setIsWishlisted] = useState<Record<string, boolean>>({});

  const handleToggleWishlist = (slug: string | undefined, isWishlisted: boolean | undefined) => {
    if (!slug) return;
    toggleWishlist(slug, isWishlisted, isLoggedIn);

    setIsWishlisted((prev) => ({
      ...prev,
      [slug]: !isWishlisted,
    }));
  };

  return (

    <section className="space-y-4 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          className="max-w-[60%] sm:max-w-full"
          title={headerTitle}
          description={headerDescription}
        />
        <LinkText title={`${buttonText ? buttonText : 'Shop More'}`} href={headerLink} />
      </div>
      <div>

        {isLoading ? (
          <p className="text-sm text-center text-muted-foreground">
            Loading {headerTitle}...
          </p>
        ) : error ? (
          <p className="text-sm font-medium text-center text-red-500">
            Something Went Wrong While Fetching {headerTitle}
          </p>
        ) : products?.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground">
            No {headerTitle} found
          </p>
        ) : (
          <Carousel
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products?.map((product) => {
                console.log('product', product)
                return (
                  <CarouselItem
                    key={product.id}
                    className="pl-4 basis-1/2 lg:basis-1/4"
                  >
                    <div className="flex h-full">
                      <ProductCard
                        // id={product.id}
                        imageSrc={product.images?.[0]?.file}
                        alt={product.name}
                        title={product.name}
                        price={product.price}
                        rating={product.average_rating}
                        slug={product.slug_name}
                        isWishlisted={isWishlisted[product.slug_name] ?? product.my_wishlist}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute left-0 hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex top-1/3 hover:bg-gray-50" />
            <CarouselNext className="absolute right-0 hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex top-1/3 hover:bg-gray-50" />
          </Carousel>)}
      </div>
    </section>
  )
}

export default ProductSection