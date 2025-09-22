import React from "react";

import { Col } from "@/types/table";
import { INewOrder } from "@/types/orders";

export const NewOrdersConstants = (): Col<INewOrder>[] => {
  return [
    {
      title: "ORDER ID",
      render: (data: INewOrder) => <span className="px-2">{data.order_id}</span>,
    },
    {
      title: "TOTAL AMOUNT",
      render: (data: INewOrder) => <span className="px-2">{data.total_amount}</span>,
    },
    {
      title: "STATUS",
      render: (data: INewOrder) => (
        <div className="px-2">
          <span
            style={{
              backgroundColor: data?.status.primary_color,
              color: data?.status.text_color,
            }}
            className="text-xs px-3 py-2  rounded-full capitalize flex items-center justify-center gap-1 w-3/4 "
          >
            {data.status?.name}
          </span>
        </div>
      ),
    },
    {
      title: "CUSTOMER",
      render: (data: INewOrder) => <span className="px-2">{data.customer}</span>,
    },
    {
      title: "PAYMENT",
      render: (data: INewOrder) => <span className="px-2">{data.payment_method}</span>,
    },
    {
      title: "ORDER DATE",
      render: (data: INewOrder) => {
        const date = new Date(data.order_date);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short", // Aug instead of August
          day: "numeric",
        });

        return (
          <div className="flex justify-start w-full">
            <span className="text-gray-800">{formattedDate}</span>
          </div>
        );
      },
    }


  ];
};
