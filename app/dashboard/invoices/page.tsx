"use client";

import React, { useState } from "react";
import InvoiceTable from "./components/invoice-table";
import PageHeader from "@/components/common/header/page-header";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";

const InvoicesPage = () => {
  const [dataLength, setDataLength] = useState<number>(0)

  const getDatalength = (length: number) => {
    setDataLength(length)
  }
  return (
    <main className="space-y-4 p-4 bg-white">
      <PageHeader
        totalItems={dataLength}
        searchPlaceholder="Search by Invoice ID"
        type="All Invoice"
      />
      <InvoiceTable setDatalength={getDatalength} />
    </main>
  );
};

export default withPermissions(InvoicesPage, [Permissions.CAN_READ_INVOICES]);
