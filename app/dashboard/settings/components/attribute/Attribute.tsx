import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { AttributeConstant } from "./Attribute-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { IAttribute } from "@/types/Settings";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";

const AttributeTab = () => {
  const dispatch = useAppDispatch();
  const {searchQuery} = useAppSelector((state)=>state.filter);
  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext } =
    useInfiniteFetch<IAttribute>("/attribute", "search", searchQuery  );

  return (
    <DataCard
      title="View Attribute"
      filter={
        <div className="flex items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Attribute"))}
          >
            Add Attribute
          </Button>
        </div>
      }
    >
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={AttributeConstant(dispatch)}
            data={data as IAttribute[]}
            loading={loading && data.length === 0}
            height="h-auto"
            hasSerialNo={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default AttributeTab;
