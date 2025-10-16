"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
// import { Button } from "@/components/ui/button";
// import { Download } from "lucide-react";
import React, { useState } from "react";
import { IReturnProducts } from "@/types/cancel";
import { ReturnRequestConstant } from "./components/return-request-constant";
import ReturnRequestDetails from "./components/return-request-details";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";

const CancelRequestPage = () => {
  const [selectedRequest, setSelectedRequest] = useState<IReturnProducts | null>(
    null
  );
  const {
    data: returnRequest,
    loading: isLoading,
    fetchNext,
    hasMore,
  } = useInfiniteFetch<IReturnProducts>(
    "/return-items/",
    "",
    '',
    '',
  );
  return (
    <div className="bg-white p-4 flex flex-col gap-4 h-full">
      <PageHeader
        type="Return Request"
        totalItems={returnRequest?.length}
        searchPlaceholder="Search Products Name"
      // customButton={exportButton}
      />

      <InfiniteScroll
        dataLength={returnRequest.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<InfiniteScrollLoader />}
        scrollableTarget="orders-table"
        style={{ overflow: "visible" }}
        endMessage={
          !hasMore && returnRequest.length > 0 ? (
            <p className="text-center text-gray-500 py-4">
              No more Cancelled items to load
            </p>
          ) : null
        }
      >
        <CustomTable
          cols={ReturnRequestConstant()}
          data={returnRequest as IReturnProducts[]}
          loading={isLoading}
          height="h-auto"
          onRowClick={(row) => setSelectedRequest(row)}
        />
      </InfiniteScroll>
      {selectedRequest && (
        <ReturnRequestDetails
          data={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default CancelRequestPage;
