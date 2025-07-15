"use client";
import CustomTable from "@/components/common/table/custom-table";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import { InvoiceConstants } from "./invoice-constants";
import { IInvoice } from "@/types/invoice";

const InvoiceTable = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <CustomTable<IInvoice>
        cols={InvoiceConstants(dispatch)}
        data={[] as IInvoice[]}
        enableBulkSelect={true}
      />
    </div>
  );
};

export default InvoiceTable;
