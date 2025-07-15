import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { InventoryConstant } from "./inventory-location-constant";
import { setActiveSetting } from "@/redux/features/setting-slice";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IInventory } from "@/types/Settings";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { ESettings } from "@/types/table";
import SearchBox from "@/components/common/filter/search-box";

const InventoryTab = () => {
  const dispatch = useAppDispatch();
  const scrollId = "infinite-scroll-container";
  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IInventory>(
    "/inventory",
    "search",
    searchQuery
  );

  return (
    <DataCard
      title="Inventory"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() =>
              dispatch(setActiveSetting(ESettings.ADD_INVENTORY_LOCATION))
            }
          >
            Add Inventory
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
            cols={InventoryConstant(dispatch)}
            data={data as IInventory[]}
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

export default InventoryTab;
