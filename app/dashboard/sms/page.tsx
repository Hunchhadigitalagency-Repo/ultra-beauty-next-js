"use client";
import PageHeader from "@/components/common/header/page-header";

import React from "react";
import { useAppDispatch } from "@/redux/hooks";

import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";

import CustomTable from "@/components/common/table/custom-table";
import { ISms } from "@/types/cms";
import { SmsConstants } from "./components/sms-constant";


const SmsPage = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<ISms>("/cms/sms/");
  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Sms"
        totalItems={count}
        searchPlaceholder="Search by Name"
        path="/dashboard/sms/add-sms"
        buttonText="Create Sms"
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
            cols={SmsConstants(dispatch)}
            data={data as ISms[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default SmsPage;
