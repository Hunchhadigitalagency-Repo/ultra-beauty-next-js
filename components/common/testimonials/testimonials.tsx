"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState } from "react";
import TestimonialCarousel from "../carousel/testimonial-carousel";
import SectionHeader from "../header/section-header";

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState<string>("text");

  return (
    <section className="space-y-6 px-4 py-8 w-full flex flex-col items-center text-center">
      <Tabs
        defaultValue={activeTab}
        className="w-full max-w-6xl"
        onValueChange={setActiveTab}
      >
        {/* Header + Tabs Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 text-left w-full">
          <div className="flex-1">
            <SectionHeader
              title="What People Thinks"
              description="Look for yourself what people think about us."
              className="items-start text-left"
            />
          </div>

          <div className="flex-1 flex justify-start md:justify-end">
            <TabsList className="flex items-center gap-6">
              <TabsTrigger
                key={"text"}
                value="text"
                className="data-[state=active]:bg-transparent border-b-[2px] border-transparent data-[state=active]:border-orange data-[state=active]:text-orange rounded-none capitalize hover:border-orange hover:text-orange hover:cursor-pointer px-4"
              >
                Text
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-transparent border-b-[2px] border-transparent data-[state=active]:border-orange data-[state=active]:text-orange rounded-none capitalize hover:border-orange hover:text-orange hover:cursor-pointer px-4"
              >
                Video
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Content */}
        <TabsContent value="text" className="py-8">
          <TestimonialCarousel />
        </TabsContent>

        <TabsContent value="video" className="py-8">
          {/* You can add video testimonials here */}
          Video Testimonial here
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Testimonials;
