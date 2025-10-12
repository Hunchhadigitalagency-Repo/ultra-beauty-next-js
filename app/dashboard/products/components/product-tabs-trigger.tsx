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
  className="group 
  border-none 
  shadow-none 
  ring-0 
  focus-visible:ring-0 
  data-[state=active]:shadow-none 
  data-[state=active]:ring-0 
  data-[state=active]:bg-transparent 
  data-[state=active]:text-primary 
  data-[state=active]:font-semibold 
  hover:text-primary 
  text-accent-foreground 
  max-sm:text-sm 
  flex items-center justify-start px-0"
>
  {title}{" "}
  <span className="py-1.5 px-3 text-xs group-data-[state=active]:bg-transparent">
    ({count || 0})
  </span>
</TabsTrigger>

  );
};

export default ProductTabsTrigger;
