import React from "react";

import Image from "next/image";
import { Col } from "@/types/table";
import { ISales } from "@/types/sales";
import DateChips from "@/components/common/chips/date-chips";

export const SalesConstant = (): Col<ISales>[] => {
  return [
    {
      title: "PRODUCT IMAGE",

      render: (data: ISales) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data?.images[0]}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "PRODUCT NAME",

      render: (data: ISales) => <span>{data.name}</span>,
    },
    {
      title: "ORDER ID",

      render: (data: ISales) => <span>#OD00{data.order_id || '155'}</span>,
    },
    {
      title: "DATE",

      render: (data: ISales) => <DateChips date={data.date || "2025-08-22T14:35:00Z"} />,
    },
    {
      title: "SOLD",

      render: (data: ISales) => <span>{data.total_sold_quantity}</span>,
    },
    {
      title: "EARNING",

      render: (data: ISales) => <span className="flex justify-start w-full">{data.total_earning}</span>,
    },
  ];
};
