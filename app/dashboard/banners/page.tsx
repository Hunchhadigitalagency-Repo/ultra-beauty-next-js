"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IBanner, IDashboardBanner } from "@/types/banner";
import { BannerConstant } from "./components/banner-constant";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";

const BannerPage = () => {
  const dispatch = useAppDispatch();

  const { searchQuery } = useAppSelector((state) => state.filter);

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, totalCount } =
    useInfiniteFetch<IBanner>("/cms/banners/", "search", searchQuery);

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Banners"
        totalItems={totalCount}
        searchPlaceholder="Search by banner type"
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
            data={data as IDashboardBanner[]}
            loading={loading && data.length === 0}
            onRowClick={() => { }}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default withPermissions(BannerPage, [Permissions.CAN_READ_BANNERS]);
