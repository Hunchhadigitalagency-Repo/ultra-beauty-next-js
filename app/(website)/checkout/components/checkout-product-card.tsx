"use client";
import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { CartResultType } from "@/types/cart";

interface CheckoutProductCardProps {
  item: CartResultType;
}

const CheckoutProductCard: React.FunctionComponent<CheckoutProductCardProps> = ({ item }) => {

  const totalPrice = item.quantity * parseFloat(item.product.price)

  return (
    <div className="flex flex-col gap-3 p-3 bg-white rounded-lg sm:flex-row sm:gap-4 sm:p-4">
      <div className="flex items-start w-full gap-3 sm:gap-4 sm:w-auto">
        <div className="relative shadow rounded-t-lg rounded-bl-lg rounded-br-[70px] flex-shrink-0 w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] overflow-hidden">
          <Image
            src={item.product.image || "/placeholder.svg"}
            alt={item.product.name}
            height={400}
            width={400}
            className="object-fill rounded-lg"
          />
        </div>

        <div className="flex-1 sm:hidden">
          <div className="flex items-start justify-between">
            <h3 className="flex-1 pr-2 text-sm font-medium leading-tight">
              {item.product.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 text-xs font-medium text-foreground">
            {item.product_variant?.product_variants.map((variant) => (
              <span key={variant.id} className="border px-2 py-1 bg-[#FAFAFA]">
                {variant.attribute.name.charAt(0).toUpperCase() + variant.attribute.name.slice(1)}
                :
                {variant.attribute_variant.name}
              </span>
            ))}
          </div>

          <h3 className="hidden pt-2 text-base font-medium leading-tight sm:block md:text-lg lg:text-xl">
            {item.product.name}
          </h3>

          <p dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(item.product.general_description),
          }} className="text-xs leading-tight sm:text-sm line-clamp-2 text-foreground">
          </p>
          <p>Total:{totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductCard;