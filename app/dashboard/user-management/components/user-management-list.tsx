"use client";

import {  useAppSelector } from "@/redux/hooks";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IUsers } from "@/types/user-management";
import { UserManagementConstants } from "./user-management-constants";
import { ETypes } from "@/types/table";

const UserManagementList = () => {

  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } = useInfiniteFetch<IUsers>(
    "/user-management/?user_type=user",
    "search",
    searchQuery
  );
  return (
    <section className="space-y-4 bg-white p-4">
      <PageHeader
        type="User List"
        totalItems={count}
        searchPlaceholder="Search by Username"
        pageType={ETypes.USER_MANAGEMENT}
      />
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable<IUsers>
            cols={UserManagementConstants()}
            data={data as IUsers[]}
            loading={loading && data.length === 0}
            getItemId={(user) => user.id.toString()}
            height="!h-full"
          />
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default UserManagementList;
