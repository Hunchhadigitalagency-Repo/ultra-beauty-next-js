"use client";

import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import CustomTable from "@/components/common/table/custom-table";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import React from "react";
import dynamic from "next/dynamic";
import { NewsletteEmailrConstant } from "./components/newletter-email-constant";
import PageHeader from "@/components/common/header/page-header";

// Dynamically import InfiniteScroll so it runs only on client
const InfiniteScroll = dynamic(
  () => import("react-infinite-scroll-component"),
  {
    ssr: false,
  }
);

const NewsletterClients = () => {
  const { data, hasMore, fetchNext, totalCount } = useInfiniteFetch(
    "/cms/news-letter-email/"
  );
  const scrollId = "infinite-scroll-container";

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader type="Newsletter Client" isSearch={false} totalItems={totalCount} />

      <div id={scrollId}  className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data?.length || 0}
          next={fetchNext}
          hasMore={!!hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            data={data || []}
            cols={NewsletteEmailrConstant()}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default NewsletterClients;
