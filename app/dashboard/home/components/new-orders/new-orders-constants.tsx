import React from "react";

import { Col } from "@/types/table";
import { AppDispatch } from "@/redux/store";
import { NewOrderResponse } from "@/types/dashboard";
import StatusCard from "@/components/common/cards/outline-status-card";

export const NewOrdersConstants = (dispatch: AppDispatch): Col<NewOrderResponse>[] => {
  console.log(dispatch);
  return [
    {
      title: "ORDER ID",
      render: (order: NewOrderResponse) => <span>{order.order_id}</span>,
    },

    // {
    //   title: "PRODUCT NAME",
    //   render: (order: NewOrderResponse) => (
    // <div className="flex items-center gap-3">
    //   <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
    //     <Image
    //       src={order. || "/placeholder.svg?height=40&width=40"}
    //       alt={data.name}
    //       width={40}
    //       height={40}
    //       className="object-cover"
    //     />
    //   </div>
    //   <span className="font-medium text-gray-800">{order.name}</span>
    // </div>
    // <p>Backend bata data aako chaina</p>
    //   ),
    // },
    {
      title: "PRICE",

      render: (order: NewOrderResponse) => <span>{Number(order.total_amount) === 0 ? "NaN" : "Nrs." + order.total_amount}</span>,
    },
    {
      title: "STATUS",

      render: (order: NewOrderResponse) => <StatusCard primaryColor={order.status.primary_color} textColor={order.status.text_color} status={order.status.name} />,
    },
    {
      title: "CUSTOMER",

      render: (order: NewOrderResponse) => <span>{order.customer}</span>,
    },
    // {
    //   title: "QUANTITY",

    //   render: (order: NewOrderResponse) => <p>Backend bata data aako chaina</p>,
    // },
    {
      title: "PAYMENT",
      render: (order: NewOrderResponse) => <span>{order.payment_method}</span>,
    },
    {
      title: "ORDER DATE",
      render: (order: NewOrderResponse) => new Date(order.order_date).toLocaleString([], {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase(),
    },
  ];
};
