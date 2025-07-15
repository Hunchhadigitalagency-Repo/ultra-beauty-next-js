"use client";
import PageHeader from "@/components/common/header/page-header";

import React from "react";
import { useAppDispatch } from "@/redux/hooks";

import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { NewsletterConstants } from "./components/newsletter-constants";
import CustomTable from "@/components/common/table/custom-table";
import { INewsletters } from "@/types/cms";


const NewsletterPage = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<INewsletters>("/cms/newsletters/");
  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Newsletter"
        totalItems={count}
        searchPlaceholder="Search by Name"
        path="/dashboard/newsletters/add-newsletters"
        buttonText="Create Newsletter"
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
            cols={NewsletterConstants(dispatch)}
            data={data as INewsletters[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default NewsletterPage;
