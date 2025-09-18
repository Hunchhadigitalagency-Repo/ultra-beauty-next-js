"use client";
import React from "react";
import { IBanner } from "@/types/banner";
import { useAppDispatch } from "@/redux/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { BannerConstant } from "./components/banner-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";


const BannerPage = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<IBanner>("/cms/banners/");

  return (
    <main className="p-4 space-y-4 bg-white">
      <PageHeader
        type="Banners"
        totalItems={count}
        searchPlaceholder="Search by banner name"
        path="/dashboard/banners/add-banner"
        buttonText="Add Banners"
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
            cols={BannerConstant(dispatch)}
            data={data as IBanner[]}
            loading={loading && data.length === 0}
            onRowClick={() => { }}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default BannerPage;
