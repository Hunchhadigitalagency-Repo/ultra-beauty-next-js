"use client";

import PageHeader from "@/components/common/header/page-header";
import CustomTable from "@/components/common/table/custom-table";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ITeam } from "@/types/cms";
import { TeamConstants } from "./components/team-constant";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";


const TeamPage = () => {
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.filter);
    const scrollId = "infinite-scroll-container";

    const { data, loading, hasMore, fetchNext, totalCount } =
        useInfiniteFetch<ITeam>("/cms/our-team/", "search", searchQuery);

    return (
        <main className="space-y-4 bg-white p-4">
            <PageHeader
                type="Team"
                totalItems={totalCount}
                searchPlaceholder="Search by Name"
                path="/dashboard/team/add-team"
                buttonText="Create Team"
                isSearch={true}
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
                        cols={TeamConstants(dispatch)}
                        data={data as ITeam[]}
                        loading={loading && data.length === 0}
                        onRowClick={() => { }}
                        height="h-auto"
                    />
                </InfiniteScroll>
            </div>
        </main>
    );
};

export default TeamPage;
