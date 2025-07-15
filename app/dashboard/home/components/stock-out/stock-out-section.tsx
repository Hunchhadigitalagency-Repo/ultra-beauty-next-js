import DataCard from "@/components/common/cards/data-card";
import Image from "next/image";
import React from "react";

const data = [
  {
    name: "Product Name",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Product Name",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Product Name",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Product Name",
    image: "/placeholder.svg?height=40&width=40",
  },
   {
    name: "Product Name",
    image: "/placeholder.svg?height=40&width=40",
  },
];

const StockOutSection = () => {
  return (
    <DataCard
      title="Stock Out"
      filter={
        <div className="rounded-full border bg-gray h-8 w-8 flex items-center justify-center">
          <span className="text-accent-foreground font-medium text-sm">{data.length}</span>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4 h-[220px] overflow-y-auto">
        {data.map((item, index) => (
          <div className="flex items-center gap-3" key={index}>
            <div className="w-10 h-10 rounded-md overflow-hidden  flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg?height=40&width=40"}
                alt={item.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="font-medium text-foreground text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </DataCard>
  );
};

export default StockOutSection;
