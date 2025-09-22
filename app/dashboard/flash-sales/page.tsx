"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IFlashSales } from "@/types/flash-sales";
import { FlashSalesConstant } from "./components/flash-sales-constant";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";

const FlashSalesPage = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext,  totalCount } =
    useInfiniteFetch<IFlashSales>("/flashsales/", "search", searchQuery);

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Flash Sales"
        totalItems={totalCount}
        searchPlaceholder="Search by sales name"
        path="/dashboard/flash-sales/add-flash-sales"
        buttonText="Add Flash Sales"
      />
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={FlashSalesConstant(dispatch)}
            data={data as IFlashSales[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default withPermissions(FlashSalesPage, [
  Permissions.CAN_READ_FLASH_SALES,
]);
