"use client";
import React from "react";

import BlogCard from "./blog-card";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";
import { useInfiniteFetchNoToken } from "@/hooks/use-infinite-fetch-no-token";
import BlogScrabbledLoader from "@/components/ui/blog-scribble";
import { IBlog } from "@/types/cms";

const Blogs = () => {
  const { data: blogs, loading } = useInfiniteFetchNoToken<IBlog>(
    "/cms/blogs/?",
    3
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      {loading && <BlogScrabbledLoader />}
    </section>
  );
};

export default Blogs;