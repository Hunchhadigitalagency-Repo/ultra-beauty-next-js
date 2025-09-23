"use client";

import React, { useMemo, useState } from "react";
import { IBlog } from "@/types/cms";
import BlogCard from "../../components/blogs/blog-card";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "@/components/common/filter/search-box";
import BlogScrabbledLoader from "@/components/ui/blog-scribble";
import SectionHeader from "@/components/common/header/section-header";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import { useAppSelector } from "@/redux/hooks";
import { AlertCircle } from "lucide-react";

const BlogsList = () => {

  const [searchValue, setSearchValue] = useState("");
  const { isLoggedIn } = useAppSelector(state => state.authentication)

  // Dynamically create the search URL
  const searchUrl = useMemo(() => {
    const encoded = encodeURIComponent(searchValue.trim());
    return encoded ? `/cms-blogs/?search=${encoded}` : "/cms-blogs/";
  }, [searchValue]);

  // Custom infinite fetch hook
  const {
    data: blogs,
    loading,
    hasMore,
    fetchNext,
  } = useInfiniteFetch<IBlog>(searchUrl, "9", undefined, undefined, isLoggedIn); // Fetch 9 at a time

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
          {
            loading ? (
              <BlogScrabbledLoader />
            ) : blogs?.length === 0 ? (
              <div className="w-full h-60 flex flex-col justify-center items-center">
                <AlertCircle className="w-8 h-8 mb-2 font-semibold text-gray-400" />
                <p className="text-base font-semibold text-gray-400 capitalize">
                  Oops! no blogs right now...
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  blogs?.map((blog, index) => (
                    <BlogCard key={index} slug={blog.slug} sub_title={blog.sub_title} title={blog.title} author={blog.author.username} cover_image={blog.cover_image} created_at={blog.created_at} />
                  ))
                }
              </div>
            )
          }
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default BlogsList;
