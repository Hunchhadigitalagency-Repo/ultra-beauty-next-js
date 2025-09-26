import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { ITransactions } from "@/types/transactions";
import { formatDateTime } from "@/lib/date-time-utils";

export const TransactionConstants = (
  dispatch: AppDispatch
): Col<ITransactions>[] => {
  return [

    {
      title: "TRANSACTION ID",
      render: (data: ITransactions) => (
        <span className="font-medium text-foreground text-sm">#{data.id}</span>
      ),
    },
    {
      title: "AMOUNT",
      render: (data: ITransactions) => (
        <span className="font-medium text-foreground text-sm">
          Nrs. {data.amount}
        </span>
      ),
    },
    {
      title: "INVOICE ID",
      render: (data: ITransactions) => (
        <span className="font-medium text-foreground text-sm">
          {data.invoice_id}
        </span>
      ),
    },
    {
      title: "ORDER ID",
      render: (data: ITransactions) => (
        <span className="font-medium text-foreground text-sm">#{data.id}</span>
      ),
    },
    {
      title: "DATE",
      render: (data: ITransactions) => (
        <span className="font-medium text-foreground text-sm">
          {formatDateTime(data.date)}
        </span>
      ),
    },
    {
      title: "ACTIONS",
      render: (data: ITransactions) => (
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
            name={`Transaction ID: ${data.id}`}
          />
        </div>
      ),
    },
  ];
};
