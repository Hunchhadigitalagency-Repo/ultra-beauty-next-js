"use client"

import React, { useState } from 'react';
import Review from './components/review';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch';
import { SingleProductResponse } from '@/types/product';
import SingleProductSection from './components/single-product-section';
import DetailDecription from './components/detail-description-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SingleProductPage: React.FunctionComponent = () => {

  const params = useParams();
  const slug = params?.slug as string;

  const [activeTab, setActiveTab] = useState<string>("Description");

  const { data } = useFetchData<SingleProductResponse>(
    `/public-products/${slug}`, true
  );

  return (
    <section>
      <SingleProductSection />
      <Tabs
        defaultValue={activeTab}
        className="w-full padding-x"
        onValueChange={setActiveTab}
      >
        <div className="flex-1 flex justify-start">
          <TabsList className="flex items-center gap-6 bg-white">
            <TabsTrigger
              key={"Description"}
              value="Description"
              className="font-playfair text-lg data-[state=active]:bg-transparent border-b-[2px] border-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary rounded-none capitalize data-[state=active]:shadow-none hover:text-primary hover:cursor-pointer px-4"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="Reviews"
              className="font-playfair text-lg data-[state=active]:bg-transparent border-b-[2px] border-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary rounded-none capitalize data-[state=active]:shadow-none hover:text-primary hover:cursor-pointer px-4"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="Description"
          className="py-6"
        >
          <DetailDecription />
        </TabsContent>
        <TabsContent value="Reviews" className="py-8">
          <Review reviews={data?.reviews || []} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default SingleProductPage
