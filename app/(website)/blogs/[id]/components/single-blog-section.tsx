"use client";

import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import SectionHeader from "@/components/common/header/section-header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useFetchProduct } from "@/hooks/use-fetch-product";
import { IBlog } from "@/types/cms"; // import your IBlog interface

const SingleBlogSection = () => {
  const id = useParams().id;

const path = id ? `cms/blogs/${id}` : "";

  const { data: blog, loading, error } = useFetchProduct<IBlog>(path);

  if (loading) {
    return (
      <section className="padding text-center py-20">
        <p className="text-lg font-medium">Loading blog...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="padding text-center py-20">
        <p className="text-lg font-medium text-red-600">Failed to load blog.</p>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="padding text-center py-20">
        <p className="text-lg font-medium">Blog not found.</p>
      </section>
    );
  }

  const cleanHtml = DOMPurify.sanitize(blog.description || "", {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="space-y-8 padding max-w-5xl mx-auto">
      <SectionHeader title={blog.title} description={blog.sub_title || "Watch inside story"} />

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

        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="default"
            className="text-black rounded-full w-[250px] h-11 uppercase font-semibold tracking-wide shadow-md hover:bg-gray-100"
            onClick={() => {
              window.location.href = "/shop";
            }}
          >
            SHOP NOW <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-3xl font-semibold text-custom-black max-w-4xl">{blog.title}</h2>

        <div className="flex flex-wrap gap-6 text-accent-foreground text-sm font-medium">
          <div className="flex items-center gap-2">
            <UserCircle2Icon className="w-5 h-5" />
            <span>{blog.author?.username || "Unknown Author"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          </div>
          {blog.category?.name && (
            <div className="flex items-center gap-2">
              <span className="uppercase tracking-wide">{blog.category.name}</span>
            </div>
          )}
        </div>
      </div>

      <article
        className="prose max-w-none prose-indigo text-gray-800"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />

      {blog.tags && (
        <div>
          <h4 className="text-xl font-semibold mb-2 text-custom-black">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {blog.tags.split(",").map((tag: string) => (
              <span
                key={tag.trim()}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleBlogSection;
