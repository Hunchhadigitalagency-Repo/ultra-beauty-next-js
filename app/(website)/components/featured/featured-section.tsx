"use client"

import React from 'react';
import { Result } from '@/types/product';
import { AlertCircle } from "lucide-react";
import useFetchData from '@/hooks/use-fetch';
import FeaturedProductCard from './featured-product-card';
import LinkText from '@/components/common/header/link-text';
import SectionHeader from '@/components/common/header/section-header';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';


interface FeaturedProductResponse extends Result {
  id: number
}

const FeaturedSection = () => {

  const { data: featuredProducts, loading, error } = useFetchData<FeaturedProductResponse[]>(`featuredproduct/`);

  return (
    <section className="padding space-y-4">
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
              <div className='h-60 flex w-full justify-center items-center'>
                <p className='text-gray'>
                  Loading Featured Product...
                </p>
              </div>
            ) : error ?
              (
                <div className='h-60 flex flex-col w-full justify-center items-center'>
                  <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                  <p className='text-red'>
                    Error Fetching Featured Products !
                  </p>
                </div>
              ) : featuredProducts?.length === 0 ?
                (
                  <div className='h-60 flex flex-col w-full justify-center items-center'>
                    <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                    <p className='text-red'>
                      No Featured Products Found !
                    </p>
                  </div>
                ) :
                (
                  <Carousel>
                    <CarouselContent className='-ml-2 md:-ml-4 lg:-ml-8'>
                      {
                        featuredProducts?.map((featuredProduct, index) => (
                          <CarouselItem
                            key={index}
                            className="basis-[60%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 ">
                            <FeaturedProductCard
                              image={featuredProduct?.images[0]?.file}
                              title={featuredProduct?.brand?.name}
                              desc={featuredProduct?.name}
                            />
                          </CarouselItem>
                        ))
                      }
                    </CarouselContent>
                  </Carousel>
                )
        }
      </div>
    </section>
  )
}

export default FeaturedSection