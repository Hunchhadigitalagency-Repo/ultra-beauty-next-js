"use client";

import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React, { useState } from "react";
import { CancelRequestConstant } from "./components/cancel-request-constant";
import CancelRequestDetail from "./components/cancel-request-details";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { ETypes } from "@/types/table";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { CancelRequest } from "@/types/cancel";

const CancelRequestPage = () => {
  const [selectedRequest, setSelectedRequest] =
    useState<CancelRequest | null>(null);


  // const { cancelRequests, isLoading, error } = useCancelRequests(); // using the hook

  const {
    data: cancelRequests,
    loading: isLoading,
    fetchNext,
    hasMore,
  } = useInfiniteFetch<CancelRequest>(
    "/cancel/order",
    "",
    '',
    ETypes.CANCEL_REQUEST,
  );

  console.log(cancelRequests);

  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-4 h-full">
        <PageHeader
          type="Cancel Orders"
          totalItems={cancelRequests.length}
          searchPlaceholder="Search Products Name"
        />

        <InfiniteScroll
          dataLength={cancelRequests.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget="orders-table"
          style={{ overflow: "visible" }}
          endMessage={
            !hasMore && cancelRequests.length > 0 ? (
              <p className="text-center text-gray-500 py-4">
                No more Cancelled items to load
              </p>
            ) : null
          }
        >
          <CustomTable
            cols={CancelRequestConstant()}
            data={cancelRequests}
            loading={isLoading}
            height="h-auto"
            onRowClick={(row) => setSelectedRequest(row)}
          />
        </InfiniteScroll>

        {selectedRequest && (
          <CancelRequestDetail
            data={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        )}
      </div>
    </>
  );
};

export default CancelRequestPage;
