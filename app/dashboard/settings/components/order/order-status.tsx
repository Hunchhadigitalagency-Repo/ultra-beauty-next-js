import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { OrderStatusConstant } from "./order-status-constant";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { IOrderStatus } from "@/types/Settings";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import SearchBox from "@/components/common/filter/search-box";

const OrderTab = () => {
  const dispatch = useAppDispatch();
  const scrollId = "infinite-scroll-container";
  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IOrderStatus>(
    "/order-status",
    "search",
    searchQuery
  );

  return (
    <DataCard
      title="Order Status"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
         <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Order Status"))}
          >
            Add Order Status
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
            cols={OrderStatusConstant(dispatch)}
            data={data as IOrderStatus[]}
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

export default OrderTab;
