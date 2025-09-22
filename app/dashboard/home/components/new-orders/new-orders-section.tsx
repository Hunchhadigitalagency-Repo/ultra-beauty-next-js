"use client";

import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { NewOrdersConstants } from "./new-orders-constants";
import { useRouter } from "next/navigation";
import { INeworders } from "@/types/orders";
import useFetchData from "@/hooks/use-fetch";

export interface Results {
  results: INeworders[];
}
const NewOrdersSection = () => {
  const router = useRouter();
  const { data: newOrders, loading, error } = useFetchData<Results>("/new-orders/", true);

  const newOrder = newOrders?.results || [];
  return (
    <DataCard
      title="New Orders"
      count={newOrder.length}
    >
      <div className="h-[400px] overflow-y-auto">
        <CustomTable<INeworders>
          cols={NewOrdersConstants()}
          data={newOrder as INeworders[]}
          loading={loading}
          error={error}
          onRowClick={(item) => router.push(`/dashboard/orders/single/${item.order_id}`)}
          height="h-auto"
        />
      </div>
    </DataCard>
  );
};

export default NewOrdersSection;
