"use client";
import CustomTable from "@/components/common/table/custom-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";
import { InvoiceConstants } from "./invoice-constants";
import { Invoice } from "@/types/invoices";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { useRouter } from "next/navigation";
import { setSelectedData } from "@/redux/features/authentication-slice";

interface Props {
  setDatalength?: (number: number) => void
}

const InvoiceTable = ({ setDatalength }: Props) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext, totalCount } = useInfiniteFetch<Invoice>(
    "/invoices/",
    "search",
    searchQuery
  );

  const handleRowClick = (rowData: Invoice) => {
    dispatch(setSelectedData(rowData));
    router.push(`/dashboard/invoices/${rowData.id}`);
  };
  useEffect(() => {
    if (!loading || totalCount !== 0) {
      setDatalength?.(totalCount || 0)
    }
  }, [loading, data.length, setDatalength, totalCount]);


  return (
    <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
      <InfiniteScroll
        dataLength={20}
        next={fetchNext}
        hasMore={hasMore}
        loader={<InfiniteScrollLoader />}
        scrollableTarget={scrollId}
        style={{ overflow: 'visible' }}
        endMessage={
          !hasMore && data.length > 0 ? (
            <p className="text-center text-gray-500 py-4">
              No more invoice to load
            </p>
          ) : null
        }
      >
        <CustomTable
          cols={InvoiceConstants(dispatch)}
          data={data as Invoice[]}
          loading={loading && data.length === 0}
          onRowClick={handleRowClick}
          height="h-auto"
        />
      </InfiniteScroll>
    </div>
  );
};

export default InvoiceTable;
