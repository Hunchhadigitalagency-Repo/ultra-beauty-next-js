import React from "react";

import Image from "next/image";
import { Col } from "@/types/table";
import { IOrderDetail } from "@/types/orders";
import { Badge } from "@/components/ui/badge";

export const InvoiceProductConstants = (): Col<IOrderDetail>[] => {
  return [
    {
      title: "PRODUCTS",

      render: (data: IOrderDetail) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 no-print">
            <Image
              src={data?.product?.image}
              alt={data.product?.name}
              width={40}
              height={40}
              className="object-cover h-full w-full"
            />
          </div>
          <span className="font-medium text-gray-800">
            {data.product?.name}
          </span>
        </div>
      ),
    },
    {
      title: "UNIT PRICE",

      render: (data: IOrderDetail) => <span>{data.price}</span>,
    },

    {
      title: "VARIATION",
      render: (data: IOrderDetail) => (
        <div className="flex flex-col gap-2">
          {data?.product_variant?.product_variants?.length > 0 ? (
            data?.product_variant?.product_variants?.map((item) => (
              <Badge key={item.id}>{item.attribute_variant?.name}</Badge>
            ))
          ) : (
            <span>No Variation</span>
          )}
        </div>
      ),
    },

    {
      title: "QUANTITY",

      render: (data: IOrderDetail) => <span>{data.quantity}</span>,
    },

    {
      title: "TOTAL",

      render: (data: IOrderDetail) =>
        <div className="flex justify-start w-full">
          <span>Nrs. {data.total_price}</span>
        </div>,
    },
  ];
};
