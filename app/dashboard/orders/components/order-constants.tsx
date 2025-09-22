import React from "react";

import { Col } from "@/types/table";

import { IOrders } from "@/types/orders";
import OrderStatusDropdown from "./order-status-dropdown";

export const OrderConstants = (): Col<IOrders>[] => {
  return [
    {
      title: "ORDER DETAILS",
      render: (data: IOrders) => {
        return (
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground text-sm">
              Order ID: {data?.id}
            </span>
            <span className="text-xs text-foreground">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(data?.order_created))}
            </span>
          </div>
        );
      },
    },
    {
      title: "PAYMENT DETAIL",

      render: (data: IOrders) => (
        <div className="flex flex-col">
          <span className="text-foreground text-sm font-semibold">
            Nrs. {data?.total_amount}
          </span>
          <span className="text-foreground text-xs">
            Payment Mode: {data?.payment_method}
          </span>
          <span className="text-foreground text-xs">
            Payment Status: {data?.payment_status}
          </span>
        </div>
      ),
    },
    {
      title: "USER INFO",

      render: (data: IOrders) => (
          <div className="flex flex-col">
            <span className="text-foreground font-medium text-sm">
              {data?.shipping_info?.first_name} {data?.shipping_info?.last_name}
            </span>
            <span className="text-xs text-foreground">{data?.shipping_info?.phone_no}</span>
          </div>
        )
    },
    {
      title: "ORDER STATUS",

      render: (data: IOrders) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <OrderStatusDropdown
            orderId={data?.id}
            currentStatus={data?.order_status}
          />
        </div>
      ),
    },
  ];
};
