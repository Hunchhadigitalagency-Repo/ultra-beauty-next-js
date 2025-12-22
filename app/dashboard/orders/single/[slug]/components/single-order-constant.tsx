import React from "react";

import Image from "next/image";
import { Col } from "@/types/table";
import { IOrderDetail } from "@/types/orders";
import StatusCard from "./status-card";

export const SingleOrderConstant = (): Col<IOrderDetail>[] => {
  return [
    {
      title: "VARIANT",
      render: (data: IOrderDetail) => (
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">

            <Image
              src={data.product?.image || "/placeholder.svg?height=56&width=56"}
              alt={data.product?.name || "Product"}
              width={56}   // match placeholder size
              height={56}  // match placeholder size
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex gap-4">
              {data.product_variant?.product_variants?.length > 0 &&
                data?.product_variant?.product_variants?.map((att: any, index: number) => (
                  <span key={index} className="border border-gray-500 px-2 py-0.5 rounded">
                    {att.attribute_variant?.name}
                  </span>
                ))
              }
            </div>
            <span className="font-medium text-gray-800">
              {data.product.name}
            </span>
            <span className="text-xs text-gray-500">
              Product SKU: {data.product.sku}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "PRICE",
      render: (data: IOrderDetail) => <span>Nrs. {data.price}</span>,
    },
    {
      title: "QUANTITY",
      render: (data: IOrderDetail) => <span>{data.quantity}</span>,
    },
    {
      title: "TOTAL",
      render: (data: IOrderDetail) => <span>Nrs. {data.total_price}</span>,
    },
    {
      title: "STATUS",
      render: (data: IOrderDetail) => <div className="flex  w-full">
        <StatusCard status={data.status} />
      </div>
    },
  ];
};
