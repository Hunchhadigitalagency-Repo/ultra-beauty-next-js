'use client';
import React from 'react';
import Image from 'next/image';
import useFetchData from '@/hooks/use-fetch';
import { MdFormatQuote } from "react-icons/md";
import SearchBox from '@/components/common/filter/search-box';
import SectionHeader from '@/components/common/header/section-header';
import { BrandResponse } from '@/types/product';

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
        <SearchBox
          className='py-2 text-sm font-semibold rounded-sm md:text-xl lg:text-base md:mt-5 focus-visible:border-white'
          placeholder="Find the brand as your requirement"
        />
      </div>
      {/* brand level with description */}

      {loading ? (
        <p className="text-sm text-center text-muted-foreground">
          Loading Brands Banner....
        </p>
      ) : error ? (
        <p className="text-sm font-medium text-center text-red-500">
          Something Went Wrong While Fetching Brands Banner
        </p>
      ) : data?.results.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground">
          No Brands Banner Found
        </p>
      ) : (
        <div className="space-y-10">
          {brandDetails?.map((brand, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] gap-4 sm:gap-7 items-start rounded-md"
            >
              {/* Image Block */}
              <div className="flex items-center justify-center w-full gap-3 p-2 border border-[#B3B3B3] rounded-md">
                <div className="relative w-full rounded-none h-28 md:h-32">
                  <Image
                    src={brand?.brand_image}
                    alt={`${brand?.name} logo`}
                    layout="fill"
                    className='object-cover'
                  />
                </div>
              </div>
              {/* Description Block */}
              <div className="w-full space-y-1">
                <MdFormatQuote className="w-6 h-6 text-primary sm:w-10 sm:h-10 md:w-14 md:h-14" />
                <h3 className="text-lg font-bold sm:text-xl md:text-2xl text-primary">
                  {brand?.name}
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