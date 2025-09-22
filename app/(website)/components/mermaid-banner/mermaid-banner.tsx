"use client"

import React from 'react';
import Image from 'next/image';
import { AlertCircle } from "lucide-react";
import useFetchData from '@/hooks/use-fetch';
import { BannerResponse } from '@/types/banner';
import { useRouter } from 'next/navigation';

const MermaidBanner: React.FunctionComponent = () => {

  const { data, loading, error } = useFetchData<BannerResponse[]>(`cms/advertisment-banners-dropdown/?position=Mesh%20Banner`)

  const router = useRouter();

  const handleMeshBannerClick = (productSlug: string) => {
    router.push(`/shop/${productSlug}`);
  }

  return (
    <section>
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
                <div className='padding grid grid-cols-2 w-full gap-4 lg:gap-8 '>
                  {
                    data?.map((banner) => (
                      <div onClick={() => handleMeshBannerClick(banner.product.slug_name)} key={banner?.id} className='w-full aspect-square  relative lg:aspect-5/3 cursor-pointer'>
                        <Image
                          fill
                          src={banner.image}
                          alt={banner.product.name || 'image'}
                          className="object-cover rounded-2xl "
                        />
                      </div>
                    ))
                  }
                </div>
              )
      }
    </section>
  )
}

export default MermaidBanner