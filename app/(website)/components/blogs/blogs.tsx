"use client";
import React from "react";
import BlogCard from "./blog-card";
import { BlogsList } from "@/types/cms";
import { AlertCircle } from "lucide-react";
import useFetchData from "@/hooks/use-fetch";
import LinkText from "@/components/common/header/link-text";
import BlogScrabbledLoader from "@/components/ui/blog-scribble";
import SectionHeader from "@/components/common/header/section-header";

const Blogs: React.FunctionComponent = () => {

  const { data, loading, error } = useFetchData<BlogsList>(
    `cms-blogs/?page=1&page_size=3/`
  );

  return (
    <section className="space-y-8 padding">
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
        <div className='flex items-center justify-center w-full h-60'>
          <p className='text-red'>
            Error While Fetching Blogs
          </p>
        </div>
      ) : data?.results.length === 0 ? (
        <div className='flex flex-col items-center justify-center w-full h-60'>
          <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
          <p className='text-red'>
            No Blogs Found !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data && data.results.length > 0 ? (
            data.results.map((blog, index) => {
              return <BlogCard key={index} {...blog} />;
            })
          ) : (
            <div className='flex flex-col items-center justify-center w-full h-60'>
              <AlertCircle className="w-8 h-8 mb-2 text-red-500" />
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
