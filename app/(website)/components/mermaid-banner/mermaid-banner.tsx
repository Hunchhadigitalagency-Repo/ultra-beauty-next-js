"use client"

import React from 'react';
import Image from 'next/image';
import { AlertCircle } from "lucide-react";
import useFetchData from '@/hooks/use-fetch';
import { BannerResponse } from '@/types/banner';

const MermaidBanner: React.FunctionComponent = () => {

  const { data, loading, error } = useFetchData<BannerResponse[]>(`cms/advertisment-banners/?position=Mesh%20Banner`)

  return (
    <div className='padding grid grid-cols-2 w-full gap-4 lg:gap-8 '>
      {
        loading ?
          (
            <div className='h-60 flex w-full justify-center items-center'>
              <p className='text-gray'>
                Loading Banner...
              </p>
            </div>
          ) : error ?
            (
              <div className='h-60 flex flex-col w-full justify-center items-center'>
                <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                <p className='text-red'>
                  Error Fetching Mermaid Banners !
                </p>
              </div>
            ) : data?.length === 0 ?
              (
                <div className='h-60 flex flex-col w-full justify-center items-center'>
                  <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
                  <p className='text-red'>
                    No Banners Found !
                  </p>
                </div>
              ) :
              (
                data?.map((banner) => (
                  <div key={banner?.id} className='w-full aspect-square  relative lg:aspect-5/3 '>
                    <Image
                      fill
                      src={banner.image}
                      alt={banner.product_slug}

                      className="object-cover rounded-2xl "
                    />
                  </div>
                ))
              )
      }
    </div>
  )
}

export default MermaidBanner