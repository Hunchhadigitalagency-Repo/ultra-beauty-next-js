

import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";

import BackgroundStatusCard from "@/components/common/cards/background-status-card";


export const OrderConstants = (dispatch: AppDispatch): Col<any>[] => {
  return [
    {
      title: "ORDER DETAILS",

      render: (data: any) => (
        <div className="flex items-center gap-3">
          <div className="w-17 h-17 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.image || "/placeholder.svg?height=40&width=40"}
              alt={data.name}
              width={68}
              height={68}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <BackgroundStatusCard status={data.status} />
            <span className="font-medium text-foreground text-sm">
              {data.order_id}
            </span>
            <span className="text-xs text-foreground">{data.order_date}</span>
          </div>
        </div>
      ),
    },
    {
      title: "PAYMENT DETAIL",

      render: (data: any) => (
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-sm">
            {data.payment_detail}
          </span>
          <span className="text-foreground text-xs">
            Payment Mode: {data.payment_mode}
          </span>
          <span className="text-xs text-foreground">Coupon: {data.coupon}</span>
        </div>
      ),
    },
    {
      title: "USER INFO",

      render: (data: any) => (
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-sm">
            {data.name}
          </span>
          <span className="text-foreground text-xs">{data.email}</span>
          <span className="text-xs text-foreground">{data.address}</span>
        </div>
      ),
    },
    {
      title: "DELIVERY INFO",

      render: (data: any) => (
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-sm">
            {data.delivery_address}
          </span>
          <span className="text-foreground text-xs">{data.address}</span>
        </div>
      ),
    },

    {
      title: "Action",
      render: (data: any) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.ORDERS}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
