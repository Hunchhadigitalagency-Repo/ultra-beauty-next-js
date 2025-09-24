"use client";

import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { LowStockConstants } from "./low-stock-constants";
import useFetchData from "@/hooks/use-fetch";
// import useFetchDataToken from "@/hooks/use-fetch-data-token";

interface LowStock {
  id: number;
  name: string;
  image: string;
  remaining_units: number;
  sold_units: number;
  status: string;
}
export interface Results {
  results: LowStock[];
}

const LowStockSection = () => {
  const { data: lowStocks, loading, error } = useFetchData<Results>("/lowstock/", true);

  const lowStock = lowStocks?.results || [];
  return (
    <DataCard title="Low Stock" >
      <div className="h-[300px] overflow-y-auto">
        <CustomTable<LowStock>
          cols={LowStockConstants()}
          data={lowStock as LowStock[]}
          loading={loading}
          error={error}
          onRowClick={() => { }}
          height="h-auto"
        />
      </div>
    </DataCard>
  );
};

export default LowStockSection;
