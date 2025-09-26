"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React, { } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { NavigationInfoConstants } from "./components/navigation-info-constant";
import { INavigationInfo } from "@/types/navigation-info";
import { Permissions } from "@/types/permissions";
import { withPermissions } from "@/hoc/withPermissions";

const NavigationInfoPage = () => {
  const dispatch = useAppDispatch();

  const { searchQuery } = useAppSelector((state) => state.filter);

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, totalCount} =
    useInfiniteFetch<INavigationInfo>(
      "/cms/navigation-infos/",
      "search",
      searchQuery
    );

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Navigation Info"
        totalItems={totalCount}
        searchPlaceholder="Search Navigation Info"
        path="/dashboard/navigation-info/add-navigation"
        buttonText="Create Navigation Info"
        isSearch={true}
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
            cols={NavigationInfoConstants(dispatch)}
            data={data as INavigationInfo[]}
            loading={loading && data.length === 0}
            onRowClick={() => { }}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default withPermissions(NavigationInfoPage, [
  Permissions.CAN_READ_NAVIGATION_INFO,
]);
