"use client";

import PageHeader from "@/components/common/header/page-header";
import InfiniteScrollLoader from "@/components/common/loader/infinite-scroll-loader";
import CustomTable from "@/components/common/table/custom-table";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { useAppDispatch } from "@/redux/hooks";
import { INotification } from "@/types/cms";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationConstants } from "./components/notification-constant";

const NotificationPage = () => {
  const dispatch = useAppDispatch();

  const scrollId = "infinite-scroll-container";
  const { data, loading, hasMore, fetchNext, count } =
    useInfiniteFetch<INotification>("/cms/notifications/");
  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type="Notifications"
        totalItems={count}
        searchPlaceholder="Search by notification"
        path="/dashboard/notification/add-notification"
        buttonText="Create notificaiton"
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
            cols={NotificationConstants(dispatch)}
            data={data as INotification[]}
            loading={loading && data.length === 0}
            onRowClick={() => {}}
            height="h-auto"
          />
        </InfiniteScroll>
      </div>
    </main>
  );
};

export default NotificationPage;
