import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { ReferralConstant } from "./referral-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { IReferral } from "@/types/Settings";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";

const ReferralTab = () => {
  const dispatch = useAppDispatch();
  const scrollId = "infinite-scroll-container";
    const {searchQuery} = useAppSelector((state)=>state.filter);

  const { data, loading, hasMore, fetchNext } =
    useInfiniteFetch<IReferral>("/referral", "search", searchQuery);
  return (
    <DataCard
      title="Referral"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
       <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Referral"))}
          >
            Add Referral
          </Button>
        </div>
      }
    >
      <div id={scrollId} className="h-[calc(100vh-20px)] overflow-y-auto">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={ReferralConstant(dispatch)}
            data={data as IReferral[]}
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

export default ReferralTab;
