import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IBlogCategory } from "@/types/Settings";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { BlogCategoryConstant } from "./blog-category-constant";
import SearchBox from "@/components/common/filter/search-box";

const BlogCategoryTab = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IBlogCategory>(
    "/cms/blog-categories/",
    "search",
    searchQuery
  );

  return (
    <DataCard
      title="All Blog Category"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
         <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting("Add Blog Category"))}
          >
            Add Blog Categories
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
            cols={BlogCategoryConstant(dispatch)}
            data={data as IBlogCategory[]}
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

export default BlogCategoryTab;
