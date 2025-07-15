import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import StatusCard from "@/components/common/cards/outline-status-card";
import { IInvoice } from "@/types/invoice";

export const InvoiceConstants = (dispatch: AppDispatch): Col<IInvoice>[] => {
  return [
    {
      title: "ID",
      render: (data: IInvoice) => (
        <span className="font-medium text-foreground text-sm">#{data.id}</span>
      ),
    },
    {
      title: "CUSTOMER NAME",
      render: (data: IInvoice) => (
        <span className="font-medium text-foreground text-sm">
          {data.customerName}
        </span>
      ),
    },
    {
      title: "ORDER ID",
      render: (data: IInvoice) => (
        <span className="font-medium text-foreground text-sm">
          {data.order_id}
        </span>
      ),
    },
    {
      title: "TOTAL",
      render: (data: IInvoice) => (
        <span className="font-medium text-foreground text-sm">
          Nrs. {data.total}
        </span>
      ),
    },
    {
      title: "INVOICE DATE",
      render: (data: IInvoice) => (
        <span className="font-medium text-foreground text-sm">
          {data.invoiceDate}
        </span>
      ),
    },
    {
      title: "STATUS",
      render: (data: IInvoice) => <StatusCard status={data.status} />,
    },
    {
      title: "ACTIONS",
      render: (data: IInvoice) => (
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
            name={data.customerName as string}
          />
        </div>
      ),
    },
  ];
};
