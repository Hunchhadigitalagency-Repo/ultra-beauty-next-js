"use client";
import PageHeader from "@/components/common/header/page-header";

import React, {   } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import CustomTable from "@/components/common/table/custom-table";
import { ICareer } from "@/types/cms";
import { careerConstant } from "./components/career-constant";
import { useRouter } from "next/navigation";

const CareerPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { searchQuery } = useAppSelector((state) => state.filter);

  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext, totalCount} =
    useInfiniteFetch<ICareer>("/cms/career/", "search", searchQuery,  "", true);

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Career"
        totalItems={totalCount}
        searchPlaceholder="Search by Name"
        path="/dashboard/career/add-career"
        buttonText="Add Career"
      />

      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable<ICareer>
            cols={careerConstant(dispatch, )}
            data={data as ICareer[]}
            loading={loading && data.length === 0}
            onRowClick={(rowData) =>
              router.push(`/dashboard/career/applicants/${rowData.slug}`)
            }
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default CareerPage;
