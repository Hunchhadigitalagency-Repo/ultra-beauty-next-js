"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import CustomTable from "@/components/common/table/custom-table";
import { IApplicant } from "@/types/cms";
import { applicantConstant } from "./components/applicant-constant";
import { useParams } from "next/navigation";
import SearchBox from "@/components/common/filter/search-box";
import { ChevronLeft, SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";

const ApplicantPage = () => {
  const { searchQuery } = useAppSelector((state) => state.filter);
  const params = useParams();

  const scrollId = "infinite-scroll-container";

  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<IApplicant>(
      `/cms/application/?career=${params?.slug}`,
      "search",
      searchQuery
    );

  return (
    <main className="space-y-4 bg-white p-4">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={"/dashboard/career"}>
            <div className="flex items-center rounded-full bg-primary cursor-pointer">
              <ChevronLeft className="text-white" />
            </div>
          </Link>
          <h1 className=" text-xl font-semibold">{params?.slug}</h1>
          <p className="text-accent-foreground text-sm">
            {count}&nbsp;{count === 1 ? "Applicant" : "Applicants"}
          </p>
        </div>
        <div className="flex gap-4">
          <SearchBox
            placeholder="Search for Applicants"
            className="rounded-full"
          />
          <div className=" border border-primary rounded-full text-primary px-3 flex items-center gap-2">
            <SquareDashedMousePointer />
            Export
          </div>
        </div>
      </section>

      <div id={scrollId} className="overflow-y-auto h-[calc(100vh-190px)]">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
          scrollableTarget={scrollId}
        >
          <CustomTable<IApplicant>
            cols={applicantConstant()}
            data={data as IApplicant[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default ApplicantPage;
