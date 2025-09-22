import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { AttributeConstant } from "./Attribute-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { IAttribute } from "@/types/Settings";
import InfiniteScroll from "react-infinite-scroll-component";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings } from "@/types/table";

const AttributeTab = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";
  const [Attribute, setAttribute] = useState<IAttribute[]>([]);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IAttribute>(
    "/attribute",
    "search",
    searchQuery
  );

  useEffect(() => {
    setAttribute(data);
  }, [data]);

  const handleItemUpdate = (updatedItem: IAttribute) => {
    setAttribute((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="View Attribute"
      filter={
        <div className="flex items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting(ESettings.ADD_ATTRIBUTE))}
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
          loader={<></>}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={AttributeConstant(dispatch, handleItemUpdate)}
            data={Attribute as IAttribute[]}
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
