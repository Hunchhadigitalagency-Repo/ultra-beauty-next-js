import React from "react";

import Image from "next/image";

import { Col } from "@/types/table";

export const LowStockConstants = (): Col<any>[] => {
  return [
    {
      title: "PRODUCT NAME",
      render: (data: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-2xl">
            <Image
              src={data.image}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover w-full h-full rounded-sm"
            />
          </div>
          <span className="font-medium text-gray-800">{data.name}</span>
        </div>
      ),
    },
    {
      title: "SOLD",

      render: (data: any) => <span>{data.sold_units}</span>,
    },
    {
      title: "REMAINING",

      render: (data: any) => <div className="flex w-full justify-center items-center">
        <span>{data.remaining_units}</span>
      </div>
    },
  ];
};
