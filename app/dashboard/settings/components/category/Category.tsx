import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { ICategory } from "@/types/Settings";
import { Button } from "@/components/ui/button";
import { CategoryConstant } from "./Category-constant";
import DataCard from "@/components/common/cards/data-card";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import SearchBox from "@/components/common/filter/search-box";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CustomTable from "@/components/common/table/custom-table";
import { setActiveSetting } from "@/redux/features/setting-slice";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";

const CategoryTab = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<ICategory>(
    "/categories",
    "search",
    searchQuery
  );

  return (
    <DataCard
      title="All Category"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />

          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Category"))}
          >
            Add Categories
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
            cols={CategoryConstant(dispatch)}
            data={data as ICategory[]}
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

export default CategoryTab;
