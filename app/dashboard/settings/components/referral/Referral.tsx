import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { ReferralConstant } from "./referral-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { IReferral } from "@/types/Settings";
import InfiniteScroll from "react-infinite-scroll-component";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings } from "@/types/table";

const ReferralTab = () => {
  const dispatch = useAppDispatch();
  const scrollId = "infinite-scroll-container";
  const { searchQuery } = useAppSelector((state) => state.filter);
  const [Referall, setReferall] = useState<IReferral[]>([]);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IReferral>(
    "/referral",
    "search",
    searchQuery
  );

    useEffect(() => {
      setReferall(data);
    }, [data]);
  
    const handleItemUpdate = (updatedItem: IReferral) => {
      setReferall((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    };
  return (
    <DataCard
      title="Referral"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting(ESettings.ADD_REFERRAL))}
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
          loader={<></>}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={ReferralConstant(dispatch, handleItemUpdate)}
            data={Referall as IReferral[]}
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
