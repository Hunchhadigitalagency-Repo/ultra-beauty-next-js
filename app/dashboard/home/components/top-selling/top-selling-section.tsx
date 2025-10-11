"use client";

import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useState } from "react";
import { TopSellingConstants } from "./top-selling-constants";
import { TopSelling } from "@/types/product";
import TopSellingFilter from "./top-selling-filter";
import useFetchData from "@/hooks/use-fetch";

export interface Results {
  results: TopSelling[];
}

const TopSellingSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("week");

  const { data: topSellings, loading, error } = useFetchData<Results>(`/top-sellings/?time_range=${selectedPeriod}`, true);

  const topSelling = topSellings?.results || [];

  return (
    <DataCard
      title="Top Selling"
      filter={
        <TopSellingFilter
          selected={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      }
    >
      <div className="h-auto max-h-[400px] overflow-y-auto">
        <CustomTable<TopSelling>
          cols={TopSellingConstants()}
          data={topSelling}
          loading={loading}
          error={error}
          onRowClick={() => { }}
          height="h-auto"
        />
      </div>
    </DataCard>
  );
};

export default TopSellingSection;
