import { TabsTrigger } from "@/components/ui/tabs";
import React from "react";

interface IProductTabsTrigger {
  value: string;
  title: string;
  count: number;
}

const ProductTabsTrigger = ({ title, count, value }: IProductTabsTrigger) => {
  return (
    <TabsTrigger
      value={value}
      className="group data-[state=active]:bg-none border-none data-[state=active]:text-primary hover:text-primary text-accent-foreground data-[state=active]:font-semibold max-sm:text-sm flex items-center justify-start px-0"
    >
      {title}{" "}
      <span className="bg-none py-1.5 px-3 text-xs group-data-[state=active]:bg-transparent group-data-[state=active]:border-none group-data-[state=active]:border-none">
        ({count || 0})
      </span>
    </TabsTrigger>
  );
};

export default ProductTabsTrigger;
