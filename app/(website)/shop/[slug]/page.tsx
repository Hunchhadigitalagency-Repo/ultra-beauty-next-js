"use client"

import React, { useState } from 'react';
import Review from './components/review';
import { useParams } from 'next/navigation';
import useFetchData from '@/hooks/use-fetch';
import { SingleProductResponse } from '@/types/product';
import SingleProductSection from './components/single-product-section';
import DetailDecription from './components/detail-description-section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FAQSection from '@/components/common/faq/faq-section';
import SingleProductInformationLoader from './components/single-product-information-loader';
import { AlertCircle } from 'lucide-react';

const SingleProductPage: React.FunctionComponent = () => {

  const params = useParams();
  const slug = params?.slug as string;

  const [activeTab, setActiveTab] = useState<string>("Description");

  const { data, loading, error } = useFetchData<SingleProductResponse>(
    `/public-products/${slug}`, true
  );
  if (loading) {
    return (
      <div className="mt-4 ml-4 sm:mt-6 sm:mx-14">
        <SingleProductInformationLoader />
      </div>
    );
  }

  if (!data)
    return (
  <div className="flex flex-col items-center justify-center w-full h-60 mt-10 mb-10">
        <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
        <p className="font-extralight text-sm text-gray-400 capitalize">
          Oops! no Products You looking for is not availabe for sale right
          now...
        </p>
      </div>
    );
    if (error) return <div>Error loading product...</div>;
    const {
    detail_description,
    tutorial,
    youtube_link,
    reviews,
  } = data;
  return (
    <section>
      <SingleProductSection />
      <Tabs
        defaultValue={activeTab}
        className="w-full padding-x"
        onValueChange={setActiveTab}
      >
        <div className="flex-1 flex justify-start">
          <TabsList className="flex items-center gap-6 bg-white overflow-x-auto">
            <TabsTrigger
              key={"Description"}
              value="Description"
              className="font-playfair text-xl bg- font-semibold border-b-[2px] pb-4   data-[state=active]:border-b-primary data-[state=active]:text-primary rounded-none capitalize data-[state=active]:bg-white hover:text-primary hover:cursor-pointer px-4"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="Specification"
              className="font-playfair text-xl font-semibold bg- border-b-[2px] pb-4  data-[state=active]:border-b-primary data-[state=active]:text-primary rounded-none capitalize data-[state=active]:bg-white hover:text-primary hover:cursor-pointer px-4"
            >
              Ingredients
            </TabsTrigger>
            <TabsTrigger
              value="Reviews"
              className="font-playfair text-xl font-semibold bg- border-b-[2px] pb-4  data-[state=active]:border-b-primary data-[state=active]:text-primary rounded-none capitalize data-[state=active]:bg-white hover:text-primary hover:cursor-pointer px-4"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="Description"
          className="py-4 space-y-6  w-full flex flex-col min-h-[200px]"
        >
          <DetailDecription detail_description={detail_description || ''} title="" />
        </TabsContent>
        <TabsContent value="Specification" className="py-2 min-h-[200px]">
          <DetailDecription
            detail_description={tutorial}
            title=""
            youtube_link={youtube_link}
          />
        </TabsContent>
        <TabsContent value="Reviews" className="py-4 min-h-[200px]">
          <Review reviews={reviews} />
        </TabsContent>
      </Tabs>
      <FAQSection page_query="product" product_slug={slug} />
    </section>
  )
}

export default SingleProductPage
