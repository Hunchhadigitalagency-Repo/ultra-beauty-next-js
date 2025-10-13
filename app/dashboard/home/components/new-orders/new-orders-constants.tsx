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
      title: "PRODUCT NAME",
      render: (data: INewOrder) => (
        <span className="px-2">{data.product_name}</span>
      ),
    },
    {
      title: "PRICE",
      render: (data: INewOrder) => <span>{Number(data.total_amount) === 0 ? "NaN" : "Nrs." + data.total_amount}</span>
    },
    {
      title: "STATUS",
      render: (data: INewOrder) => (
        <div className="px-2">
          <button
            style={{
              backgroundColor: data.status.primary_color,
              color: data.status.text_color,
            }}
            className="w-[100px] rounded-sm py-1 px-2 text-center"
          >
            <p className="">{data.status.name}</p>
          </button>
        </div>
      ),
    },
    {
      title: "CUSTOMER",
      render: (data: INewOrder) => <span className="px-2">{data.customer}</span>,
    },
    {
      title: "QUANTITY",
      render: (data: INewOrder) => <span className="px-2">{data.quantity}</span>,
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
