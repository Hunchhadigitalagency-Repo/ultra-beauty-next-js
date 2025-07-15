"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import VarietyTabContent from "./variety-tab-content";

const settings = [
  { name: "Kitchen", categoryId: 36 },
  { name: "Comfort", categoryId: 2 },
  { name: "Pregnancy", categoryId: 3 },
];

const VarietyTabs = () => {
  const [activeTab, setActiveTab] = useState<string>(settings[0].name);

  return (
    <Tabs
      defaultValue={activeTab}
      className="w-full"
      onValueChange={setActiveTab}
    >
      <ScrollArea className="w-full h-full pb-2 sm:pb-0">
        <TabsList className="flex items-center gap-8">
          {settings.map((setting, index) => (
            <TabsTrigger
              key={index}
              value={setting.name}
              className="data-[state=active]:bg-transparent border-b-[2px] border-transparent data-[state=active]:border-orange data-[state=active]:text-orange rounded-none capitalize hover:border-orange hover:text-orange hover:cursor-pointer px-4"
            >
              {setting.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" className="sm:hidden" />
      </ScrollArea>

      <div className="flex-1">
        {settings.map((setting, index) => (
          <TabsContent
            value={setting.name}
            key={index}
            className="mt-0 sm:mt-2"
          >
            <VarietyTabContent categoryId={setting.categoryId} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default VarietyTabs;
