"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CheckoutProductCardProps {
  item: any;
}

const CheckoutProductCard = ({ item }: CheckoutProductCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white">
      <div className="flex gap-3 sm:gap-4 w-full sm:w-auto items-start">
        <div className="relative shadow rounded-t-lg rounded-bl-lg rounded-br-[70px] flex-shrink-0 w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            height={400}
            width={400}
            className="object-fill rounded-lg"
          />
        </div>



        <div className="flex-1 sm:hidden">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm leading-tight flex-1 pr-2">{item.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 cursor-pointer hover:text-red-600 flex-shrink-0"
              onClick={() => console.log("Remove")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 text-xs font-medium text-foreground">
            <span className="border px-2 py-1 bg-[#FAFAFA]">Color: {item.color || 'Blue'}</span>
            <span className="border px-2 py-1 bg-[#FAFAFA]">Size: {item.size || 'M'}</span>
          </div>

          <h3 className="hidden sm:block font-playfair font-medium text-base md:text-lg lg:text-xl pt-2 leading-tight">{item.name}</h3>

          <p className="text-xs sm:text-sm text-foreground leading-tight">
            {item.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center justify-center border border-primary py-2 px-3 rounded">
            <span className="text-xs sm:text-sm font-medium text-foreground text-center">
              Get By 15 May to 18 May
            </span>
          </div>

          <div className="flex items-center justify-center bg-primary py-2 px-3 rounded">
            <span className="text-white text-xs sm:text-sm font-medium text-center">
              Standard Delivery Rate: Nrs 1500
            </span>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="hidden sm:flex h-8 w-8 p-0 cursor-pointer hover:text-red-600 flex-shrink-0 self-start"
        onClick={() => console.log("Remove")}
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </Button>
    </div>
  );
};

export default CheckoutProductCard;