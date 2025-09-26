"use client";

import CustomTable from "@/components/common/table/custom-table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { GeneralCouponConstant } from "./components/general-cupons-constant";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";
import { useInfiniteFetchCoupons } from "@/hooks/use-infinite-fetch-coupons";
import { Tabs, TabsList } from "@/components/ui/tabs";
import ProductTabsTrigger from "../products/components/product-tabs-trigger";
import SearchBox from "@/components/common/filter/search-box";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InfluencerCouponConstant } from "./components/influencer-cupons-constant";
import { useRouter } from "next/navigation";
import { setCounts } from "@/redux/features/product-count";

const CouponsPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const persistedCounts = useAppSelector((state) => state.products.count);

  const [activeTab, setActiveTab] = useState<string>("general");

  const getActivePath = (tab: string) => {
    switch (tab) {
      case "influencer":
        return "/coupons/?coupon_type=influencer";
      default:
        return "/coupons/?coupon_type=general";
    }
  };

  const { data, counts, loading, hasMore, fetchNext, } = useInfiniteFetchCoupons(
    getActivePath(activeTab)
  );

  const scrollId = "infinite-scroll-container";

  console.log('this is the data', data);


  useEffect(() => {
    if (counts && persistedCounts.total === 0) {
      dispatch(setCounts(counts)); // ✅ now using setCounts
    }
  }, [counts, dispatch, persistedCounts.total]);

  return (
    <main className="space-y-4 bg-white p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center h-full w-full gap-6">
          <ProductTabsTrigger
            value="general"
            count={persistedCounts.general_coupon_count}
            title="General Coupons"
          />
          <ProductTabsTrigger
            value="influencer"
            count={persistedCounts.influencer_coupon_count}
            title="Influencer Coupons"
          />

          <div className="flex items-center gap-4 flex-wrap">
            <SearchBox placeholder="Search by name" />

            <Link href={"/dashboard/cupons/add-coupon"}>
              <Button>Add Coupon</Button>
            </Link>
          </div>
        </TabsList>
        <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
          <InfiniteScroll
            dataLength={data.length}
            next={fetchNext}
            hasMore={hasMore}
            loader={<InfiniteScrollLoader />}
            scrollableTarget={scrollId}
          >
            <CustomTable
              cols={
                activeTab === "general"
                  ? GeneralCouponConstant(dispatch)
                  : InfluencerCouponConstant(dispatch)
              }
              data={data}
              loading={loading}
              height="h-auto"
              striped={true}
              onRowClick={(rowData) =>
                router.push(
                  activeTab === "general"
                    ? `/dashboard/cupons/general/${rowData.id}`
                    : `/dashboard/cupons/influencer/${rowData.id}`
                )
              }
            />
          </InfiniteScroll>
        </div>
      </Tabs>
    </main>
  );
};

export default withPermissions(CouponsPage, [Permissions.CAN_READ_COUPONS]);
