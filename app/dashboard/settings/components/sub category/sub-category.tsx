import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { SubCategoryConstant } from "./sub-category-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings } from "@/types/table";
import { ISubCategory } from "@/types/Settings";

const SubCategoryTab = () => {
  const dispatch = useAppDispatch();
  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);
  const [subCategories, setsubCategories] = useState<ISubCategory[]>([]);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<ISubCategory>(
    "/subcategories",
    "search",
    searchQuery
  );
  useEffect(() => {
    setsubCategories(data || []);
  }, [data]);

  const handleItemUpdate = (updatedItem: ISubCategory) => {
    setsubCategories((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="Sub Category"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() =>
              dispatch(setActiveSetting(ESettings.ADD_SUB_CATEGORY))
            }
          >
            Add Sub Categories
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
            cols={SubCategoryConstant(dispatch, handleItemUpdate)}
            data={subCategories as any[]}
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

export default SubCategoryTab;
