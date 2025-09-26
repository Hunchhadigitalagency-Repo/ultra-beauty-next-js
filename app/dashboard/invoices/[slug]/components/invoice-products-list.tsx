"use client";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { InvoiceProductConstants } from "./invoice-products-constants";
import { IOrderDetail } from "@/types/orders";

const InvoiceProductsList = ({ data }: { data: IOrderDetail[] }) => {
  return <CustomTable cols={InvoiceProductConstants()} data={data} height="h-[50vh] !bg-none" rowClass="!bg-none"/>;
};

export default InvoiceProductsList;
