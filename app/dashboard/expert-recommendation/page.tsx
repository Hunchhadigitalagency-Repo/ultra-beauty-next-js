"use client";

import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import { IExpertRecommendation } from "@/types/cms";
import { ExpertRecommendationConstant } from "./components/expert-recommendation-constant";

const ExpertRecommendationPage = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<IExpertRecommendation>("/cms/expert-recommendations/");

  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Expert Recommendation"
        totalItems={count}
        searchPlaceholder="Search recommendation"
        path="/dashboard/expert-recommendation/add-expert-recommendation"
        buttonText="Create Expert Recommendations"
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
            cols={ExpertRecommendationConstant(dispatch)}
            data={data as IExpertRecommendation[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default ExpertRecommendationPage;
