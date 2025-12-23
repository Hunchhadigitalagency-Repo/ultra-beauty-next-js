import { TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { cn } from "@/lib/utils"; // Standard shadcn utility

interface IProductTabsTrigger {
  value: string;
  title: string;
  count: number;
  customCss?: string;
  underlineClassName?: string; // New prop for specific underline control
}

const ProductTabsTrigger = ({ 
  title, 
  count, 
  value, 
  customCss, 
  underlineClassName 
}: IProductTabsTrigger) => {
  return (
    <TabsTrigger
      value={value}
      className={cn(
        "group border-none shadow-none bg-transparent rounded-none",
        "data-[state=active]:shadow-none data-[state=active]:bg-transparent",
        "data-[state=active]:text-primary data-[state=active]:font-semibold",
        "hover:text-primary text-accent-foreground max-sm:text-sm",
        "flex items-center justify-start px-0 pb-2 transition-all",
        customCss
      )}
    >
      <span className={cn(
        "border-b-2 border-transparent transition-all duration-300",
        "group-data-[state=active]:border-primary",
        underlineClassName
      )}>
        {title}
      </span>

      <span className="py-1.5 px-3 text-xs opacity-70 group-data-[state=active]:opacity-100">
        ({count || 0})
      </span>
    </TabsTrigger>
  );
};

export default ProductTabsTrigger;