'use client';
import React from 'react';
import Image from 'next/image';
import useFetchData from '@/hooks/use-fetch';
import { MdFormatQuote } from "react-icons/md";
import { BrandResponse } from '@/types/product';
import SectionHeader from '@/components/common/header/section-header';
import { AlertCircle } from 'lucide-react';
import BrandsModal from '@/components/common/brands/brandsModal';

const BrandsDescSection: React.FunctionComponent = () => {

  const { data, loading, error } = useFetchData<BrandResponse>("/public-brands");
  const brandDetails = data?.results

  return (
    <section className='space-y-8 padding'>
      <div className='flex flex-col justify-between gap-5 md:flex-row'>
        <SectionHeader
          titleClassName='text-xl md:text-2xl xl:text-3xl'
          descriptionClassName=' md:text-sm lg:text-base'
          title="Brands That You Love"
          description="Find the brand from the market that are loved by everyone."
        />
        <BrandsModal />
      </div>
      {/* brand level with description */}

      {loading ? (
        <div className='flex items-center justify-center w-full h-60'>
          <p className='font-extralight text-sm text-gray-400'>
            Loading Brands Banner...
          </p>
        </div>
      ) : error ? (
        <div className='flex flex-col items-center justify-center w-full h-60'>
          <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
          <p className='font-extralight text-sm text-gray-400'>
            Oops! Something went wrong...
          </p>
        </div>
      ) : data?.results.length === 0 ? (
        <div className='flex flex-col items-center justify-center w-full h-60'>
          <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
          <p className='font-extralight text-sm text-gray-400 capitalize'>
            Oops! no brand banners right now...
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {brandDetails?.map((brand, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[35%_65%] lg:grid-cols-[20%_80%] gap-4 sm:gap-7 items-start rounded-md"
            >
              {/* Image Block */}
              <div className="flex items-center justify-center w-full gap-3 p-2 border border-[#B3B3B3] rounded-md">
                <div className="relative w-full rounded-none h-28 md:h-32">
                  <Image
                    src={brand?.brand_image}
                    alt={`${brand?.brand_name} logo`}
                    layout="fill"
                    className='object-cover'
                  />
                </div>
              </div>
              {/* Description Block */}
              <div className="w-full ">
                <MdFormatQuote className="w-6 h-6 text-primary sm:w-10 sm:h-10 md:w-14 md:h-14" />
                <h3 className="text-lg font-bold sm:text-xl md:text-2xl text-primary">
                  {brand?.brand_name}
                </h3>
                <p className="text-xs leading-relaxed text-justify sm:text-sm text-foreground font-poppins">
                  {brand?.description}
                </p>
              </div>
            </div>
          ))}
        </div>)}
    </section>
  )
}

export default BrandsDescSection