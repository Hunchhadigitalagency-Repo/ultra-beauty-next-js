"use client";
import InfiniteScroll from "react-infinite-scroll-component";

import { ISms } from "@/types/cms";
import { Permissions } from "@/types/permissions";
import { withPermissions } from "@/hoc/withPermissions";
import { SmsConstants } from "./components/sms-constant";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";

const SmsPage = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, totalCount} = useInfiniteFetch<ISms>(
    "/cms/sms/",
    "search",
    searchQuery
  );



  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="SMS"
        totalItems={totalCount}
        searchPlaceholder="Search by Name"
        path="/dashboard/sms/add-sms"
        buttonText="Create SMS"
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
            cols={SmsConstants(dispatch, )}
            data={data as ISms[]}
            loading={loading && data.length === 0}
            onRowClick={() => { }}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default withPermissions(SmsPage, [Permissions.CAN_READ_SMS]);
