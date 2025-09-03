"use client";

import React, { useMemo, useState } from "react";
import { IBlog } from "@/types/cms";
import BlogCard from "../../components/blogs/blog-card";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "@/components/common/filter/search-box";
import BlogScrabbledLoader from "@/components/ui/blog-scribble";
import SectionHeader from "@/components/common/header/section-header";
import { useInfiniteFetchNoToken } from "@/hooks/use-infinite-fetch-no-token";

const BlogsList = () => {

  const [searchValue, setSearchValue] = useState("");

  // Dynamically create the search URL
  const searchUrl = useMemo(() => {
    const encoded = encodeURIComponent(searchValue.trim());
    return encoded ? `/cms-blogs/?search=${encoded}` : "/cms-blogs/";
  }, [searchValue]);

  // Custom infinite fetch hook
  const {
    data: blogs,
    hasMore,
    fetchNext,
  } = useInfiniteFetchNoToken<IBlog>(searchUrl, 9); // Fetch 9 at a time

  // Set search value when search box input changes
  const getValue = (value: string) => {
    setSearchValue(value);
  };

  return (
    <section className="space-y-4 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader title="Blogs" description="Watch inside story" />
        <SearchBox placeholder="Search Blogs" sendValue={getValue} />
      </div>

      <div>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchNext}
          hasMore={hasMore}
          scrollThreshold={0.4}
          loader={<BlogScrabbledLoader count={3} />}
          endMessage={
            <p className="text-center text-sm text-muted-foreground mt-4">
              You’ve reached the end!
            </p>
          }
        >
          {/* Blog cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default BlogsList;
