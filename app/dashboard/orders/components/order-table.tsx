"use client";

import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect,   } from "react";
import { OrderConstants } from "./order-constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { useRouter } from "next/navigation";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { IOrders } from "@/types/orders";
import useFetchDropdown from "@/hooks/use-fetch-dropdown";
import { IOrderStatus } from "@/types/Settings";
import { setOrderStatusDropdown } from "@/redux/features/dropdown-slice";
import { ETypes } from "@/types/table";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";

interface Props {
  setDatalength: (number: number) => void;
}

const OrderTable = ({ setDatalength }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { searchQuery } = useAppSelector((state) => state.filter);

  const { data, loading, hasMore, fetchNext, totalCount} = useInfiniteFetch<IOrders>(
    "/order/",
    "search",
    searchQuery,
    ETypes.ORDERS
  );

  const { data: dropdownData } = useFetchDropdown<IOrderStatus>(
    "/order-status/dropdown/"
  );



  useEffect(() => {
    if (dropdownData.length > 0) {
      dispatch(setOrderStatusDropdown(dropdownData));
    }
  }, [dropdownData, dispatch]);

  useEffect(() => {
    if (totalCount !== undefined) {
      setDatalength?.(totalCount || 0);
    }
  }, [totalCount, setDatalength]);

  return (
    <div id="orders-table" className="overflow-y-auto h-[calc(100vh-190px)]">
      <InfiniteScroll
        dataLength={totalCount || 0}
        next={fetchNext}
        hasMore={hasMore}
        loader={<InfiniteScrollLoader />}
        scrollableTarget="orders-table"
        style={{ overflow: 'visible' }}
        endMessage={
          !hasMore && data.length > 0 ? (
            <p className="text-center text-[12px] text-gray-500 py-4">
              No more orders to load
            </p>
          ) : null
        }
      >
        <CustomTable<IOrders>
          cols={OrderConstants()}
          data={data}
          onRowClick={(rowData) => {
            dispatch(setSelectedData(rowData));
            router.push(`/dashboard/orders/single/${rowData.id}`);
          }
          }
          loading={loading && data.length === 0}
          height="h-auto"
        />
      </InfiniteScroll>
    </div>
  );
};

export default OrderTable;