"use client";

import {
  ArrowRight,
  Calendar,
  UserCircle2Icon
} from "lucide-react";
import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
// import { IBlog } from "@/types/cms";
// import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { useFetchProduct } from "@/hooks/use-fetch-product";
import SectionHeader from "@/components/common/header/section-header";
import { dummyBlogs } from "@/constants/blog-data";

const SingleBlogSection = () => {
  // const id = useParams().id;

  // const path = id ? `cms/blogs/${id}` : "";
  const blog = dummyBlogs[0];

  // const { data: blog, loading, error } = useFetchProduct<IBlog>(path);

  // if (loading) {
  //   return (
  //     <section className="padding text-center py-20">
  //       <p className="text-lg font-medium">Loading blog...</p>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section className="padding text-center py-20">
  //       <p className="text-lg font-medium text-red-600">Failed to load blog.</p>
  //     </section>
  //   );
  // }

  // if (!blog) {
  //   return (
  //     <section className="padding text-center py-20">
  //       <p className="text-lg font-medium">Blog not found.</p>
  //     </section>
  //   );
  // }

  const cleanHtml = DOMPurify.sanitize(blog.description || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="space-y-8 padding w-full mx-auto">
      <SectionHeader title="Blog" description="Watch inside stories" />
      <div className="relative w-full h-[442px] rounded-lg overflow-hidden group shadow-lg">
        {blog.cover_image ? (
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 text-lg">
            No Image Available
          </div>
        )}

        <div className="absolute bottom-6 right-6 ">
          <Button
            variant="default"
            className="text-white rounded-full w-[250px] h-11 uppercase font-semibold tracking-wide shadow-md bg-[#FF2B5F] "
            onClick={() => {
              window.location.href = "/shop";
            }}
          >
            SHOP NOW <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-col  gap-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-custom-black max-w-4xl font-playfair">
          {blog.title}
        </h2>
        {/* Date & Author */}
        <div className="flex flex-wrap gap-6 text-accent-foreground text-sm font-medium ">
          <div className="flex items-center gap-2">
            <UserCircle2Icon className="w-5 h-5" />
            <span>{blog.author?.username || "Unknown Author"}</span>
          </div>
          {blog.category?.name && (
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-wide bg-[#40C040] text-white px-3 rounded-full">
                {blog.category.name}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Description */}
      <article
        className="prose max-w-none prose-indigo text-gray-800"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </section>
  );
};

export default SingleBlogSection;
