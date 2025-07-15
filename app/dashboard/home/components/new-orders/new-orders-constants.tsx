import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";

import { Col } from "@/types/table";
import StatusCard from "@/components/common/cards/outline-status-card";

export const NewOrdersConstants = (dispatch: AppDispatch): Col<any>[] => {
  console.log(dispatch);
  return [
    {
      title: "ORDER ID",
      render: (data: any) => <span>{data.order_id}</span>,
    },

    {
      title: "PRODUCT NAME",
      render: (data: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.image || "/placeholder.svg?height=40&width=40"}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-medium text-gray-800">{data.name}</span>
        </div>
      ),
    },
    {
      title: "PRICE",

      render: (data: any) => <span>{data.price}</span>,
    },
    {
      title: "STATUS",

      render: (data: any) => <StatusCard status={data.status} />,
    },
    {
      title: "CUSTOMER",

      render: (data: any) => <span>{data.sold}</span>,
    },
    {
      title: "QUANTITY",

      render: (data: any) => <span>{data.earnings}</span>,
    },
    {
      title: "PAYMENT",
      render: (data: any) => <span>{data.payment}</span>,
    },
    {
      title: "ORDER DATE",
      render: (data: any) => <span>{data.order_date}</span>,
    },
  ];
};
