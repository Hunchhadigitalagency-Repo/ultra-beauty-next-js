import React, { useEffect, useState } from "react";

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
import { ESettings } from "@/types/table";

const CategoryTab = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);
  const [category, setCategory] = useState<ICategory[]>([])
  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<ICategory>(
    "/categories",
    "search",
    searchQuery
  );
  useEffect(() => {
    setCategory(data)
  }, [data])

  const handleItemUpdate = (updatedItem: ICategory) => {
    setCategory((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="All Category"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />

          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting(ESettings.ADD_CATEGORY))}
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
          loader={<></>}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={CategoryConstant(dispatch, handleItemUpdate)}
            data={ category  as ICategory[]}
            loading={loading && data.length === 0}
            height="h-auto"
            hasSerialNo={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default CategoryTab;
