"use client"
import React, { useState } from 'react';
import { IProduct } from '@/types/product';
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
import { AlertCircle } from 'lucide-react';

interface ProductSectionProps {
  headerTitle: string;
  headerDescription: string;
  buttonText?: string;
  headerLink: string;
  products: IProduct[] | [];
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

    <section className="space-y-4 padding ">
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
          <div className='flex items-center justify-center w-full h-60'>
            <p className='font-extralight text-sm text-gray-400'>
              Loading {headerTitle} Products...
            </p>
          </div>
        ) : error ? (
          <div className='flex flex-col items-center justify-center w-full h-60'>
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className='font-extralight text-sm text-gray-400'>
              Oops! Something went wrong...
            </p>
          </div>
        ) : products?.length === 0 ? (
          <div className='flex flex-col items-center justify-center w-full h-60'>
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className='font-extralight text-sm text-gray-400 capitalize'>
              Oops! no {headerTitle} Products right now...
            </p>
          </div>
        ) : (
          <Carousel
            className="w-full"
          >
            <CarouselContent className="ml-4 gap-2">
              {products?.map((product) => {
                return (
                  <CarouselItem
                    key={product.name}
                    className="basis-1/2 lg:basis-1/4 p-2 px-2 items-center rounded-sm"
                  >
                    <div className="flex w-full h-full">
                      <ProductCard
                        imageSrc={product.images?.[0]?.file}
                        alt={product.name}
                        discountTag={product.discount_percentage}
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
            <CarouselPrevious className="absolute z-20 left-0 hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex top-1/3 hover:bg-gray-50" />
            <CarouselNext className="absolute z-20 right-0 hidden text-gray-600 -translate-y-1/2 bg-white border-gray-200 lg:flex top-1/3 hover:bg-gray-50" />
          </Carousel>)}
      </div>
    </section>
  )
}

export default ProductSection