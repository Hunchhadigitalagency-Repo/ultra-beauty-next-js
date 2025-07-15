import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { AdminConstant } from "./admin-constant";
import { IAdmin } from "@/types/Settings";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";

const AdminTab = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext } =
    useInfiniteFetch<IAdmin>("/admin", "search", searchQuery);

  return (
    <DataCard
      title="Admins"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Admin"))}
          >
            Add Admins
          </Button>
        </div>
      }
    >
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data?.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={AdminConstant(dispatch)}
            data={data as IAdmin[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
            hasSerialNo={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default AdminTab;
