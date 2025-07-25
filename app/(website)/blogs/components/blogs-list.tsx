"use client";

import React from "react";
// import { IBlog } from "@/types/cms";
import BlogCard from "../../components/blogs/blog-card";
// import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "@/components/common/filter/search-box";
// import BlogScrabbledLoader from "@/components/ui/blog-scribble";
import SectionHeader from "@/components/common/header/section-header";
// import { useInfiniteFetchNoToken } from "@/hooks/use-infinite-fetch-no-token";
import { dummyBlogs } from "@/constants/blog-data";

const BlogsList = () => {

  // const {
  //   data: blogs,
  //   loading,
  //   hasMore,
  //   fetchNext,
  // } = useInfiniteFetchNoToken<IBlog>(`/cms/blogs/`, 6);

  // if (loading && blogs.length === 0) {
  //   return (
  //     <section className="padding text-center py-20">
  //       <BlogScrabbledLoader count={6} />
  //     </section>
  //   );
  // }

  return (
    <section className="space-y-4 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader title="Blogs" description="Watch inside story" />
        <SearchBox placeholder="Search Blogs" />
      </div>

      <div>
        {/* <InfiniteScroll
          dataLength={blogs.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<BlogScrabbledLoader count={3} />}
        > */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
        {/* </InfiniteScroll> */}
      </div>
    </section>
  );
};

export default BlogsList;
