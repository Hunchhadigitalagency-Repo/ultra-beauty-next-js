import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { TaxConstant } from "./tax-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { ITaxes } from "@/types/Settings";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";

const TaxTab = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext } =
    useInfiniteFetch<ITaxes>("/taxes", "search", searchQuery);

  return (
    <DataCard
      title="Taxes"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Tax"))}
          >
            Add Tax
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
            cols={TaxConstant(dispatch)}
            data={data as ITaxes[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="max-h-[calc(100vh-20px)]"
            hasSerialNo={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default TaxTab;
