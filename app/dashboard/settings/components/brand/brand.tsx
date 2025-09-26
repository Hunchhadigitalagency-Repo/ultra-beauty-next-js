import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { BrandConstant } from "./brand-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { IBrand } from "@/types/Settings";
import { setActiveSetting } from "@/redux/features/setting-slice";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings } from "@/types/table";

const BrandTab = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";

  const { searchQuery } = useAppSelector((state) => state.filter);
  const [brandCategories, setbrandCategories] = useState<IBrand[]>([]);

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<IBrand>(
    "/brand",
    "search",
    searchQuery
  );

  useEffect(() => {
    setbrandCategories(data);
  }, [data]);

  const handleItemUpdate = (updatedItem: IBrand) => {
    setbrandCategories((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="Brand"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() => dispatch(setActiveSetting(ESettings.ADD_BRAND))}
          >
            Add Brand
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
            cols={BrandConstant(dispatch, handleItemUpdate)}
            data={brandCategories as IBrand[]}
            loading={loading && data.length === 0}
            onRowClick={() => { }}
            height="h-auto"
            hasSerialNo={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default BrandTab;
