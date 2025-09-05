"use client";
import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { IBlog } from "@/types/cms";
import { useParams } from "next/navigation";
import useFetchData from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/header/section-header";
import {
  ArrowRight,
  CalendarDays,
  UserCircle2Icon
} from "lucide-react";


const SingleBlogSection = () => {

  const id = useParams().id;
  const path = id ? `cms/blogs/${id}` : "";

  const { data: blog, loading, error } = useFetchData<IBlog>(path, true);

  if (loading) {
    return (
      <section className="py-20 text-center padding">
        <p className="text-lg font-medium">Loading blog...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center padding">
        <p className="text-lg font-medium text-red-600">Failed to load blog.</p>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="py-20 text-center padding">
        <p className="text-lg font-medium">Blog not found.</p>
      </section>
    );
  }

  const cleanHtml = DOMPurify.sanitize(blog.description || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="w-full  space-y-8 padding">
      <SectionHeader
        title="Blog"
        description="Watch inside stories" />
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
          <div className="flex items-center justify-center w-full h-full text-lg text-gray-400 bg-gray-200">
            No Image Available
          </div>
        )}

        <div className="absolute bottom-6 right-6">
          <Button
            variant="default"
            className="text-white rounded-full w-[250px] h-11 uppercase border border-white font-semibold tracking-wide shadow-md bg-primary "
            onClick={() => {
              window.location.href = "/shop";
            }}
          >
            SHOP NOW <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-col">
        {/* Title */}
        <h2 className="max-w-4xl text-xl font-semibold md:text-3xl text-custom-black">
          {blog.title}
        </h2>
        {/* Date & Author */}
        <div className="flex flex-wrap gap-6 text-sm font-medium text-accent-foreground ">
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
            <CalendarDays className="w-6 h-6" />
            <span>
              {new Date(blog.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <article
          className='prose text-base text-[#333333] font-poppins max-w-none prose-indigo'
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </div>

    </section>
  );
};

export default SingleBlogSection;
