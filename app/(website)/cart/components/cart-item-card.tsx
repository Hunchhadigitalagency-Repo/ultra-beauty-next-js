"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CartItemCardProps } from "@/types/cart";
import PriceRow from "@/components/common/product/price-row";
import QuantityRow from "@/components/common/product/quantity-row";

export default function CartItemCard({
  item,
  onUpdate,
  onRemove,
}: CartItemCardProps) {
  return (
    <div className="relative flex flex-col p-4 rounded-lg bg-white border-b">
      <div className="flex flex-row gap-4 items-start">
        <div className="flex items-center gap-3 shrink-0">
          <Checkbox
            className="bg-white border-gray-300 h-5 w-5 mt-1 "
            checked={item.selected}
            onCheckedChange={(checked) => onUpdate({ selected: !!checked })}
          />
          <div className="relative w-[90px] h-[110px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full">
          <div className="flex gap-2 mb-2">
            <Badge variant="outline" className="bg-gray-50 border-gray-200 md:h-[30px] md:w-[100px] rounded-[2px]">
              Color: {item.color}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 border-gray-200 md:h-[30px] md:w-[100px] rounded-[2px]">
              Size: {item.size}
            </Badge>
          </div>

          <div className="hidden md:block mb-3">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 leading-snug line-clamp-2">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4  mb-3">
            <PriceRow
              previousPrice={`${item.originalPrice.toLocaleString()}`}
              price={`${item.currentPrice.toLocaleString()}`}
              priceClassname="w-[200px] md:w-[250px]"
            />
            <QuantityRow
              className="-mt-13 ml-28 md:mt-auto md:ml-none "
              onDecrease={() => onUpdate({ quantity: Math.max(1, item.quantity - 1) })}
              onIncrease={() => onUpdate({ quantity: item.quantity + 1 })}
            />
          </div>

          <p className="block md:hidden text-[10px] -mt-2 md:mt-auto font-semibold text-gray-600 leading-snug mb-3 ">
            {item.description}
          </p>
        </div>
      </div>

      <h3 className="md:hidden mt-1 text-base font-semibold text-gray-900 ml-8">
        {item.name}
      </h3>

      <Button
        variant="ghost"
        className="absolute top-2 right-0 text-black hover:text-red-700 w-8 h-8 p-0"
        onClick={onRemove}
        aria-label="Remove item"
      >
        <X className="w-5 h-5" />
      </Button>
    </div>
  );
}