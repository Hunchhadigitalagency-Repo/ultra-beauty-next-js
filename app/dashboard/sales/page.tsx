"use client"
import React, { useState } from "react";

import SalesTable from "./components/sales-table";
import PageHeader from "@/components/common/header/page-header";
import { ETypes } from "@/types/table";

const SalesPage = () => {
    const [dataLength, setDataLength] = useState<number>(0);
  
  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type={ETypes.SALES}
        totalItems={dataLength}
        searchPlaceholder="Search Sale"
        // path="/dashboard/orders/add-orders"
        isSearch={true}
        buttonText="Create Order"
        pageType={ETypes.SALES}
      />

      <SalesTable setDatalength={setDataLength}/>
    </main>
  );
};

export default SalesPage;
