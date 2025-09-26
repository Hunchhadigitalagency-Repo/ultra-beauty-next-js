"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React, { } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { PartnerCompanyConstants } from "./components/partner-company-constants";
import { IPartnerCompany } from "@/types/cms";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";

const PartnerCompany = () => {
  const dispatch = useAppDispatch();

  const { searchQuery } = useAppSelector((state) => state.filter);

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, totalCount } =
    useInfiniteFetch<IPartnerCompany>(
      "/cms/partner-companies/",
      "search",
      searchQuery
    );


  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Partner Company"
        totalItems={totalCount}
        searchPlaceholder="Search by Name"
        path="/dashboard/partner-company/add-partner-company"
        buttonText="Create Partner Company"
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
            cols={PartnerCompanyConstants(dispatch,)}
            data={data as IPartnerCompany[]}
            loading={loading && data.length === 0}
            onRowClick={() => { }}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default withPermissions(PartnerCompany, [
  Permissions.CAN_READ_NOTIFICATIONS,
]);
