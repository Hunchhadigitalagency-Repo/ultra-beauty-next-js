import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { IInventoryItem } from "@/types/product";
import { InventoryTableConstant } from "./inventory-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import { InventoryLocationValues } from "@/schemas/settings/inventory-location-schema";
import { ETypes } from "@/types/table";

interface Results {
  results: InventoryLocationValues[];
}

interface Props {
  setDatalength?: (items: number) => void
}

const InventoryTable = ({ setDatalength }: Props) => {
  const { searchQuery } = useAppSelector((state) => state.filter);
  console.log("this is search query", searchQuery);
  
  const { data, loading, fetchNext, hasMore, totalCount } = useInfiniteFetch<Results>(
    "/inventory-management/",
    "search",
    searchQuery,
    ETypes.INVENTORY
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!loading || totalCount !== 0) {
      setDatalength?.(totalCount || 0)
    }
  }, [loading, totalCount, setDatalength]);
  return (
    <>
      <div id="orders-table" className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<></>}
          scrollableTarget="orders-table"
          style={{ overflow: 'visible' }}
        >
          <CustomTable<any>
            cols={InventoryTableConstant(dispatch)}
            data={data}
            loading={loading && data.length === 0}
            height="h-auto"
            // enableBulkSelect={true}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default InventoryTable;
