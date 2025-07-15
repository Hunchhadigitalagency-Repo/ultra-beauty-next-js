import React from "react";

import OrderTable from "./components/order-table";
import PageHeader from "@/components/common/header/page-header";
import { ETypes } from "@/types/table";

const OrdersPage = () => {
  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type={ETypes.ORDERS}
        totalItems={0}
        searchPlaceholder="Search by Order ID"
        path="/dashboard/orders/add-orders"
        buttonText="Create Order"
      />

      <OrderTable />
    </main>
  );
};

export default OrdersPage;
