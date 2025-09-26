"use client";

import PageHeader from "@/components/common/header/page-header";
import React, { useState } from "react";
import TransactionTable from "./components/transaction-table";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";
import { ETypes } from "@/types/table";

const TransactionsPage = () => {
  const [dataLength, setDataLength] = useState<number>(0)

  const getDatalength = (length: number) => {
    setDataLength(length)
  }
  return (
    <main className="space-y-4 p-4 bg-white">
      <PageHeader
        totalItems={dataLength}
        searchPlaceholder="Search by Transaction ID"
        type={"All Transaction"}
        pageType={ETypes.TRANSACTIONS}
      />
      <TransactionTable setDatalength={getDatalength}/>
    </main>
  );
};

export default withPermissions(TransactionsPage, [
  Permissions.CAN_READ_TRANSACTIONS,
]);
