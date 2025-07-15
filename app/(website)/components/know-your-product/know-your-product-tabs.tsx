"use client";
import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import KnowYourProductTabContent from "./know-your-product-tab-content";

const settings = ["Baby Care", "Comfort", "Prega"];

const KnowYourProductTabs = () => {
  const [activeTab, setActiveTab] = useState<string>(settings[0]);
  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full"
      onValueChange={setActiveTab}
    >
      <ScrollArea className="w-full h-full  pb-2 sm:pb-0">
        <TabsList className="flex items-center gap-8">
          {settings?.map((setting, index) => (
            <TabsTrigger
              key={index}
              value={setting}
              className="data-[state=active]:bg-transparent  border-b-[2px] border-transparent data-[state=active]:border-orange  data-[state=active]:text-orange rounded-none capitalize hover:border-orange hover:text-orange hover:cursor-pointer px-4"
            >
              {setting}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>

      <div className="flex-1">
        {settings.map((setting, index) => (
          <TabsContent value={setting} key={index} className="mt-0 sm:mt-2">
            <KnowYourProductTabContent />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default KnowYourProductTabs;
