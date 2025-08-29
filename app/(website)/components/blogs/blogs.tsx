"use client";
import React from "react";
import BlogCard from "./blog-card";
import { BlogsList } from "@/types/cms";
import useFetchData from "@/hooks/use-fetch";
import LinkText from "@/components/common/header/link-text";
import BlogScrabbledLoader from "@/components/ui/blog-scribble";
import SectionHeader from "@/components/common/header/section-header";

const Blogs: React.FunctionComponent = () => {
  const { data, loading, error } = useFetchData<BlogsList>(
    `cms/blogs/?page=1&page_size=3`, true
  );

  console.log("Blog response from backend hai tw", data);

  return (
    <section className="padding space-y-8">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title="Hear More from Us"
          description="See the Inside story and Useful content from our side"
          titleClassName="font-playfair"
        />
        <LinkText title="See All" href="/blogs" />
      </div>

      {loading ? (
        <BlogScrabbledLoader />
      ) : error ? (
        <p className="text-center text-red-500 text-sm font-medium">
          Something Went Wrong While Fetching Blogs
        </p>
      ) : data?.results.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          No Blogs found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.results.length > 0 ? (
            data.results.map((blog, index) => {
              return <BlogCard key={index} {...blog} />;
            })
          ) : (
            <p className="text-red-400">No data found</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Blogs;
