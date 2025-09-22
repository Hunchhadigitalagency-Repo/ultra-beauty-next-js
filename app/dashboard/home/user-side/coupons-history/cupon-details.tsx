"use client"
import InfiniteScrollLoader from '@/components/common/loader/infinite-scroll-loader';
import CustomTable from '@/components/common/table/custom-table'
import { useInfiniteFetch } from '@/hooks/use-infinite-fetch';
import { useAppDispatch } from '@/redux/hooks';
import { ICoupon } from '@/types/cupons';
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { MyCouponConstant } from './coupon-constant';
import PageHeader from '@/components/common/header/page-header';

const CouponDetails = () => {

    const dispatch = useAppDispatch();

    const scrollId = "infinite-scroll-container";
    const { data, loading, hasMore, fetchNext, count } =
        useInfiniteFetch<ICoupon>("/coupons/");

    return (
        <>
            <div className="bg-white rounded-xl p-6 flex flex-col gap-4">

                <PageHeader
                    type="My Coupon Details"
                    totalItems={count}
                    searchPlaceholder="Search by coupon name"
                    path="/dashboard/cupons/add-coupon"
                    buttonText="Add Coupon"
                    typeClass='!text-xl !font-bold !text-black'
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
                            cols={MyCouponConstant(dispatch)}
                            data={data as any[]}
                            loading={loading && data.length === 0}
                            onRowClick={() => { }}
                            height="h-auto"
                        />
                    </InfiniteScroll>
                </div>
            </div>
        </>
    )
}

export default CouponDetails
