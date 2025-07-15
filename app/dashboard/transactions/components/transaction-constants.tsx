import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import BackgroundStatusCard from "@/components/common/cards/background-status-card";


export const TransactionConstants = (dispatch: AppDispatch): Col<any>[] => {
  return [
    {
      title: "ID",
      render: (data: any) => (
        <span className="font-medium text-foreground text-sm">#{data.id}</span>
      ),
    },
    {
      title: "TRANSACTION ID",
      render: (data: any) => (
        <span className="font-medium text-foreground text-sm">
          {data.transaction_id}
        </span>
      ),
    },
    {
      title: "AMOUNT",
      render: (data: any) => (
        <span className="font-medium text-foreground text-sm">
          Nrs. {data.amount}
        </span>
      ),
    },
    {
      title: "INVOICE ID",
      render: (data: any) => (
        <span className="font-medium text-foreground text-sm">
          {data.invoice_id}
        </span>
      ),
    },
    {
      title: "ORDER ID",
      render: (data: any) => (
        <span className="font-medium text-foreground text-sm">#{data.order_id}</span>
      ),
    },
    {
      title: "DATE",
      render: (data: any) => (
        <span className="font-medium text-foreground text-sm">{data.date}</span>
      ),
    },
    {
      title: "STATUS",
      render: (data: any) => <BackgroundStatusCard status={data.status} />,
    },
    {
      title: "ACTIONS",
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
            type={ETypes.TRANSACTIONS}
            name={data.customerName as string}
          />
        </div>
      ),
    },
  ];
};
