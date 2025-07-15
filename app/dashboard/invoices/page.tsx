import React from "react";
import InvoiceTable from "./components/invoice-table";
import PageHeader from "@/components/common/header/page-header";

const InvoicesPage = () => {
  return (
    <main className="space-y-4 p-4 bg-white">
      <PageHeader totalItems={0} searchPlaceholder="Search by Invoice ID" type="Invoice" />
      <InvoiceTable />
    </main>
  );
};

export default InvoicesPage;
