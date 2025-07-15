import PageHeader from "@/components/common/header/page-header";
import React from "react";
import TransactionTable from "./components/transaction-table";

const TransactionsPage = () => {
  return (
    <main className="space-y-4 p-4 bg-white">
      <PageHeader
        totalItems={0}
        searchPlaceholder="Search by Transaction ID"
        type="Transaction"
      />
      <TransactionTable />
    </main>
  );
};

export default TransactionsPage;
