import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "@/components/ui/button";

import { SocialConstant } from "./social-constant";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { ISocial } from "@/types/Settings";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "@/components/common/filter/search-box";
import { ESettings } from "@/types/table";

const SocialTab = () => {
  const dispatch = useAppDispatch();

  const { searchQuery } = useAppSelector((state) => state?.filter);
  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<ISocial>(
    "/social-links",
    "search",
    searchQuery
  );
  const [Social, setSocial] = useState<ISocial[]>([]);

  useEffect(() => {
    setSocial(data);
  }, [data]);

  const handleItemUpdate = (updatedItem: ISocial) => {
    setSocial((prevData) =>
      prevData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };
  return (
    <DataCard
      title="Social"
      filter={
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBox />
          <Button
            className="rounded-sm"
            onClick={() =>
              dispatch(setActiveSetting(ESettings.ADD_SOCIAL_LINKS))
            }
          >
            Add Social Links
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
            cols={SocialConstant(dispatch, handleItemUpdate)}
            data={Social as ISocial[]}
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

export default SocialTab;
