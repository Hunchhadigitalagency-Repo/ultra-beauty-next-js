import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { Col, ETypes } from "@/types/table";
import { IOrderItem } from "@/types/orders";
import StatusCard from "./status-card";

export const OrderConstant = (dispatch: AppDispatch): Col<IOrderItem>[] => {
  console.log(dispatch);
  return [
    {
      title: "VARIANT",
      render: (data: IOrderItem) => (
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.imageUrl || "/placeholder.svg?height=56&width=56"}
              alt={data.name}
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{data.name}</span>
            <span className="text-xs text-gray-500">
              Product SKU: {data.sku}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "PRICE",
      render: (data: IOrderItem) => <span>{data.price}</span>,
    },
    {
      title: "QUANTITY",
      render: (data: IOrderItem) => <span>{data.quantity}</span>,
    },
    {
      title: "TOTAL",
      render: (data: IOrderItem) => <span>{data.total}</span>,
    },
    {
      title: "SIZE",
      render: (data: IOrderItem) => <span>{data.size || "-"}</span>,
    },
    {
      title: "COLOUR",
      render: (data: IOrderItem) => <span>{data.color || "-"}</span>,
    },
    {
      title: "STATUS",
      render: (data: IOrderItem) => <StatusCard status={data.status} />,
    },
    {
      title: "ACTIONS",
      render: (data: IOrderItem) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <TableActions
            data={data}
            type={ETypes.ORDERS}
            name={data?.name || ""}
          />
        </div>
      ),
    },
  ];
};
