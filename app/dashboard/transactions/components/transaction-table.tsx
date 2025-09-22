"use client";
import CustomTable from "@/components/common/table/custom-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { TransactionConstants } from "./transaction-constants";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { ITransactions } from "@/types/transactions";

interface Props {
  setDatalength?: (number: number) => void
}
const TransactionTable = ({ setDatalength }: Props) => {
  const dispatch = useAppDispatch();
  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext, totalCount } = useInfiniteFetch<ITransactions>(
    "/transactions/",
    "search",
    searchQuery
  );

  useEffect(() => {
    if (!loading && totalCount !== 0) {
      setDatalength?.(totalCount || 0);
    }
  }, [totalCount, loading, data.length, setDatalength]);

  return (
    <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<InfiniteScrollLoader />}
        scrollableTarget={scrollId}
      >
        <CustomTable<ITransactions>
          cols={TransactionConstants(dispatch)}
          data={data}
          loading={loading && data.length === 0}
          onRowClick={() => { }}
          height="h-auto"
        />
      </InfiniteScroll>
    </div>
  );
};

export default TransactionTable;
