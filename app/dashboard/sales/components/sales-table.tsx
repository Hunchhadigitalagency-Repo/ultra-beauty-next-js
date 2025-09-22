"use client";
import CustomTable from "@/components/common/table/custom-table";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { SalesConstant } from "./sales-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { ISales } from "@/types/sales";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { ETypes } from "@/types/table";

const SalesTable = () => {
  const { searchQuery } = useAppSelector((state) => state.filter);
  const { data, loading, hasMore, fetchNext } = useInfiniteFetch<ISales>(
    "/sold-products/",
    "search",
    searchQuery,
    ETypes.SALES
  );
  const router = useRouter();

  return (
    <div id="orders-table" className="overflow-y-auto h-[calc(100vh-190px)]">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={<InfiniteScrollLoader />}
        scrollableTarget="orders-table"
        style={{ overflow: "visible" }}
        endMessage={
          !hasMore && data.length > 0 ? (
            <p className="text-center text-gray-500 py-4">
              No more sales to load
            </p>
          ) : null
        }
      >
        <CustomTable<any>
          cols={SalesConstant()}
          data={data}
          onRowClick={(rowData) => {
            router.push(`/dashboard/orders/single/${rowData.order_id}`);
          }}
          loading={loading && data.length === 0}
          height="h-auto"
        />
      </InfiniteScroll>
    </div>
  );
};

export default SalesTable;
