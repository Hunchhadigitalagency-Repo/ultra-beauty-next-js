import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { Invoice } from "@/types/invoices";
import BackgroundStatusCard from "@/components/common/cards/background-status-card";

export const InvoiceConstants = (dispatch: AppDispatch): Col<Invoice>[] => {
  return [
    {
      title: "ID",
      render: (data: Invoice) => (
        <span className="font-medium text-foreground text-sm">#{data.id}</span>
      ),
    },
    {
      title: "CUSTOMER NAME",
      render: (data: Invoice) => (
        <span className="font-medium text-foreground text-sm">
          {data.order?.shipping_info?.first_name +
            " " +
            data.order?.shipping_info?.last_name}
        </span>
      ),
    },
    {
      title: "ORDER ID",
      render: (data: Invoice) => (
        <span className="font-medium text-foreground text-sm">
          {data.order?.id}
        </span>
      ),
    },
    {
      title: "TOTAL",
      render: (data: Invoice) => (
        <div className="flex justify-start w-full">
          <span className="font-medium text-foreground text-sm flex w-full justify-start">
            Nrs. {data.amount}
          </span>
        </div>
      ),
    },
    {
      title: "INVOICE DATE",
      render: (data: Invoice) => (
        <span className="font-medium text-foreground text-sm">
          {data.date?.split("T")[0]}
        </span>
      ),
    },
    {
      title: "STATUS",
      render: (data: Invoice) => <BackgroundStatusCard status={data.status} />,
    },
    {
      title: "ACTIONS",
      render: (data: Invoice) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.INVOICES}
            name={data?.id?.toString() as string}
          />
        </div>
      ),
    },
  ];
};
