"use client";

import InfiniteScrollLoader from '@/components/common/loader/infinite-scroll-loader'
import CustomTable from '@/components/common/table/custom-table'
import { useInfiniteFetch } from '@/hooks/use-infinite-fetch'
import React from 'react'
import dynamic from "next/dynamic";
import { NewsletteEmailrConstant } from './components/newletter-email-constant'

// Dynamically import InfiniteScroll so it runs only on client
const InfiniteScroll = dynamic(() => import("react-infinite-scroll-component"), {
  ssr: false,
});

const NewsletterClients = () => {
  const { data,  hasMore, fetchNext } = useInfiniteFetch('/cms/news-letter-email/')
  const scrollId = "infinite-scroll-container";

  return (
    <div id={scrollId}>
      <InfiniteScroll
        dataLength={data?.length || 0}
        next={fetchNext}
        hasMore={!!hasMore}
        loader={<InfiniteScrollLoader />}
        scrollableTarget={scrollId}
      >
        <CustomTable
          data={data || []}
          cols={NewsletteEmailrConstant()}
          height='h-auto'
        />
      </InfiniteScroll>
    </div>
  )
}

export default NewsletterClients
