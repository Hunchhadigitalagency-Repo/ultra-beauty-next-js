"use client";

import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import useFetchData from "@/hooks/use-fetch";
import { PaginatedResponse } from "@/types/common";
import { TopSellingProduct } from "@/types/dashboard";
import DataCard from "@/components/common/cards/data-card";
import { TopSellingConstants } from "./top-selling-constants";
import CustomTable from "@/components/common/table/custom-table";

interface TopSellingProductResponse extends PaginatedResponse {
  results: TopSellingProduct[]
}

const TopSellingSection = () => {

  const { data: TopSellingProductResponseWithPagination, error, loading } = useFetchData<TopSellingProductResponse>(`top-sellings/?time_range=week`, true)
  const TopSellingProduct = TopSellingProductResponseWithPagination?.results

  const dispatch = useAppDispatch();

  return (
    <DataCard title="Top Selling" filter={<span>Filter</span>}>
      <CustomTable<TopSellingProduct>
        cols={TopSellingConstants(dispatch)}
        data={TopSellingProduct as TopSellingProduct[]}
        loading={loading}
        error={error}
        onRowClick={() => { }}
        height="h-auto"
      />
    </DataCard>
  );
};

export default TopSellingSection;
