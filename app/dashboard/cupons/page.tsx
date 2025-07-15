"use client";
import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";

import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { GeneralCouponConstant } from "./components/general-cupons-constant";
import { ICoupon } from "@/types/cupons";

const CuponsPage = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<ICoupon>("/coupons/");

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="General Coupons"
        totalItems={count}
        searchPlaceholder="Search by coupon name"
        path="/dashboard/cupons/add-coupon"
        buttonText="Add Coupon"
      />
      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable
            cols={GeneralCouponConstant(dispatch)}
            data={data as any[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default CuponsPage;
