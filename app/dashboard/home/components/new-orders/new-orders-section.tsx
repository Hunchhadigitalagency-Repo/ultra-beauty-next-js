"use client";

import React from "react";
import useFetchData from "@/hooks/use-fetch";
import { useAppDispatch } from "@/redux/hooks";
import { PaginatedResponse } from "@/types/common";
import { NewOrderResponse } from "@/types/dashboard";
import DataCard from "@/components/common/cards/data-card";
import { NewOrdersConstants } from "./new-orders-constants";
import CustomTable from "@/components/common/table/custom-table";

const NewOrdersSection = () => {
  interface NewOrderResponseWithPagination extends PaginatedResponse {
    results: NewOrderResponse[]
  }

  const dispatch = useAppDispatch();
  const { data: NewOrderResponseWithPagination, error, loading } = useFetchData<NewOrderResponseWithPagination>('new-orders/', true)
  const NewOrdersData = NewOrderResponseWithPagination?.results

  return (
    <DataCard
      title="New Orders"
      count={NewOrdersData?.length}
      filter={<span>Filter</span>}
    >
      <CustomTable<NewOrderResponse>
        cols={NewOrdersConstants(dispatch)}
        data={NewOrdersData as NewOrderResponse[]}
        loading={loading}
        error={error}
        onRowClick={() => { }}
        height="h-auto"
      />
    </DataCard>
  );
};

export default NewOrdersSection;
