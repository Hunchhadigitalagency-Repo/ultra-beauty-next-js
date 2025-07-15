import React from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { Button } from "@/components/ui/button";
import DataCard from "@/components/common/cards/data-card";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import SearchBox from "@/components/common/filter/search-box";
import { useAppDispatch } from "@/redux/hooks";
import CustomTable from "@/components/common/table/custom-table";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { OrderConstant } from "./order-constant";
import { IOrderItem } from "@/types/orders";
import HeaderBackCard from "@/components/common/cards/header-back-card";

export const orderItems = [
  {
    id: 1,
    imageUrl: "https://picsum.photos/200",
    name: "Pregnancy Comfort and some Radnorm text Name",
    sku: "4568795454s5s45d555",
    price: "Nrs. 54860523",
    quantity: 10,
    total: "Nrs. 54860523",
    size: "LX",
    color: "Red",
    status: "Delivered",
  },
  {
    id: 2,
    imageUrl: "https://picsum.photos/100",
    name: "Pregnancy Comfort and some Radnorm text Name",
    sku: "4568795454s5s45d555",
    price: "Nrs. 54860523",
    quantity: 10,
    total: "Nrs. 54860523",
    size: "-",
    color: "Red",
    status: "Packed",
  },
  {
    id: 3,
    imageUrl: "https://picsum.photos/300",
    name: "Pregnancy Comfort and some Radnorm text Name",
    sku: "4568795454s5s45d555",
    price: "Nrs. 54860523",
    quantity: 10,
    total: "Nrs. 54860523",
    size: "LX",
    color: "-",
    status: "Placed",
  },
  {
    id: 4,
    imageUrl: "https://picsum.photos/700",
    name: "Pregnancy Comfort and some Radnorm text Name",
    sku: "4568795454s5s45d555",
    price: "Nrs. 54860523",
    quantity: 10,
    total: "Nrs. 54860523",
    size: "LX",
    color: "-",
    status: "Shipped",
  },
];

const OrderTable = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext } =
    useInfiniteFetch<IOrderItem>("/");

  return (
    <DataCard
      filter={
        <div className="flex w-full items-center justify-between">
          <HeaderBackCard
            title={"Order Number: #245689"}
            fallBackLink="/dashboard/orders"
          />
          <div className="flex flex-col md:flex-row items-center gap-2">
            <SearchBox />
            <Button className="rounded-sm">Invoice</Button>
          </div>
        </div>
      }
    >
      <div id={scrollId} className="overflow-y-auto">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={OrderConstant(dispatch)}
            data={orderItems as IOrderItem[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            enableBulkSelect={true}
          />
        </InfiniteScroll>
      </div>
    </DataCard>
  );
};

export default OrderTable;
