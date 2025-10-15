"use client";

import React from "react";
import LinkText from "@/components/common/header/link-text";
import BlogCard from "@/app/(website)/components/blogs/blog-card";
import SectionHeader from "@/components/common/header/section-header";
import useFetchData from "@/hooks/use-fetch";
import { IBlog, RecommendedBlog } from "@/types/cms";
import { useParams } from "next/navigation";
import BlogsCardSkeleton from "./blogs-card-skeleton";
import BlogsCardErrorUI from "./blogs-card-error-UI";

const ReadMoreBlogs: React.FunctionComponent = () => {

  const id = useParams().id;
  const path = id ? `cms/blogs/${id}` : "";
  const { data, loading, error } = useFetchData<IBlog>(path, false);

  // console.log(data, "data from read more blogs");
  const recommended_blogs = data?.recommended_blogs as RecommendedBlog[];

  return (
    <section className="space-y-6 padding">
      {
        recommended_blogs && recommended_blogs.length > 0 && (
          <div className="flex items-center justify-between gap-4">
            <SectionHeader
              title="Read More"
              description="Read more blogs thate we have posted"
            />
            <LinkText title="See All" href="/blogs" />
          </div>
        )
      }
      {
        loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {
              Array.from({ length: 3 }).map((_, i) => (
                <BlogsCardSkeleton key={i} />
              ))
            }
          </div>
        ) : error ? (
          <BlogsCardErrorUI />
        ) : recommended_blogs?.length === 0 ?
          (
            <div className='w-full flex justify-center items-center h-60'>
              <p className='text-gray-400'>No Blogs Found</p>
            </div>)
          : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              recommended_blogs?.map((recommendedBlog: RecommendedBlog) =>
              (<BlogCard
                key={recommendedBlog.id}
                slug={recommendedBlog?.slug}
                title={recommendedBlog?.title}
                cover_image={recommendedBlog?.cover_image}
                sub_title={recommendedBlog?.sub_title}
                author={recommendedBlog?.author.username}
                created_at={recommendedBlog?.created_at.split("T")[0]}
              />)
              )
            }
          </div>
          )
      }
    </section>
  );
};

export default ReadMoreBlogs;
