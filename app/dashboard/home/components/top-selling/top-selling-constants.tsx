import React from "react";

import Image from "next/image";

import { Col } from "@/types/table";
import StatusCard from "@/components/common/cards/outline-status-card";
import { TopSelling } from "@/types/product";

export const TopSellingConstants = (): Col<TopSelling>[] => {
  return [
    {
      title: "PRODUCT NAME",
      render: (data: TopSelling) => (
        <div className="flex items-center gap-3 w-[250px] ">
          <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src={data.image_url}
              alt={data.product_name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-sm text-gray-800 w-full">{data.product_name}</span>
        </div>

      ),
    },
    {
      title: "PRICE",

      render: (data: TopSelling) => <span>{data.price}</span>,
    },
    {
      title: "STATUS",

      render: (data: TopSelling) => (
        <StatusCard
          status={
            data.available_stock === 0
              ? "empty"
              : data.available_stock <= 10
                ? "low stock"
                : "in stock"
          }
        />
      ),
    },
    {
      title: "SOLD",

      render: (data: TopSelling) => <span>{data.total_quantity_sold}</span>,
    },
    {
      title: "TOTAL EARNING",

      render: (data: TopSelling) => <div className="flex w-full justify-start"><span>{data.total_earning}</span> </div>,
    },
  ];
};
