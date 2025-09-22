import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { IBlogCategory } from "@/types/Settings";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { BlogCategoryConstant } from "./blog-category-constant";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings,  } from "@/types/table";

const BlogCategoryTab = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.filter);
  const scrollId = "infinite-scroll-container";

  const [blogCategories, setBlogCategories] = useState<IBlogCategory[]>([]);
  console.log("inside the blog category");
  
  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IBlogCategory>(
    "/cms/blog-categories/",
    "search",
    searchQuery
  );

  useEffect(() => {
    setBlogCategories(data);
  }, [data]);

  const handleItemUpdate = (updatedItem: IBlogCategory) => {
    setBlogCategories((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <DataCard
      title="All Blog Category"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() =>
              dispatch(setActiveSetting(ESettings.ADD_BLOG_CATEGORY))
            }
          >
            Add Blog Categories
          </Button>
        </div>
      }
    >
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={blogCategories.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<></>}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={BlogCategoryConstant(dispatch, handleItemUpdate)} // Pass the updater function
            data={blogCategories}
            loading={loading && blogCategories.length === 0}
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