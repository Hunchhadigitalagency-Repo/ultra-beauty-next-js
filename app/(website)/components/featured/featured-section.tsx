"use client"

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Result } from '@/types/product';
import { AlertCircle } from "lucide-react";
import useFetchData from '@/hooks/use-fetch';
import FeaturedProductCard from './featured-product-card';
import LinkText from '@/components/common/header/link-text';
import SectionHeader from '@/components/common/header/section-header';
import { useRouter } from 'next/navigation';

interface FeaturedProductResponse extends Result {
  id: number
}

const FeaturedSection = () => {

  const { data: featuredProducts, loading, error } = useFetchData<FeaturedProductResponse[]>(`featuredproduct/`);

  const router = useRouter();

  const handleFeaturedProductClick = (featuredProductSlug: string) => {
    router.push(`/shop/${featuredProductSlug}`);
  }

  return (
    <section className="space-y-4 padding">
      <div className="flex justify-between gap-4 ">
        <SectionHeader
          title="Featured Products"
          titleClassName="font-playfair text-[#333333]"
        />
        <LinkText title="GLOW SHOP" href="/shop" />
      </div>
      {/* Image section */}
      <div className="w-full">
        {
          loading ?
            (
              <div className='flex items-center justify-center w-full h-60'>
                <p className='text-sm font-extralight text-gray-400'>
                  Loading Featured Product...
                </p>
              </div>
            ) : error ?
              (
                <div className='flex flex-col items-center justify-center w-full h-60'>
                  <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                  <p className='text-sm font-extralight text-gray-400'>
                    Oops! Something went wrong...
                  </p>
                </div>
              ) : featuredProducts?.length === 0 ?
                (
                  <div className='flex flex-col items-center justify-center w-full h-60'>
                    <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                    <p className='text-sm font-extralight text-gray-400 capitalize'>
                      Oops! no featured products right now...
                    </p>
                  </div>
                ) :
                (
                  <Carousel className="-ml-4 ">
                    <CarouselContent className='gap-4'>
                      {
                        featuredProducts?.map((featuredProduct, index) => (
                          <CarouselItem
                            key={index}
                            className="basis-[60%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 ">
                            <FeaturedProductCard
                              image={featuredProduct?.images[0]?.file}
                              title={featuredProduct?.brand?.name}
                              desc={featuredProduct?.name}
                              onFeaturedProductClick={() => handleFeaturedProductClick(featuredProduct?.slug_name)}
                            />
                          </CarouselItem>
                        ))
                      }
                    </CarouselContent>
                    <CarouselPrevious className='ml-10 z-20' />
                    <CarouselNext className='mr-10 z-20' />
                  </Carousel>
                )
        }
      </div>
    </section>
  )
}

export default FeaturedSection