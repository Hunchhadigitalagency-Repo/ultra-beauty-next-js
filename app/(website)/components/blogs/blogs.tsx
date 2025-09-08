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
    `cms-blogs/?page=1&page_size=3/`, true
  );

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
        <div className='h-60 flex w-full justify-center items-center'>
          <p className='text-red'>
            Error While Fetching Blogs
          </p>
        </div>
      ) : data?.results.length === 0 ? (
        <div className='h-60 flex w-full justify-center items-center'>
          <p className='text-red'>
            No Blogs Found !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data && data.results.length > 0 ? (
            data.results.map((blog, index) => {
              return <BlogCard key={index} {...blog} />;
            })
          ) : (
            <div className='h-60 flex w-full justify-center items-center'>
              <p className='text-red'>
                No Data Found !
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Blogs;
