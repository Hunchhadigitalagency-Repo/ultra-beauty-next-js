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
  const path = id ? `cms/blogs-dropdown/${id}` : "";

  const { data: blog, loading, error } = useFetchData<IBlog>(path, true, {
    // config: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

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

  let cleanHtml = DOMPurify.sanitize(blog.description || "", {
    USE_PROFILES: { html: true },
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHtml, "text/html");

  const h1Elements = Array.from(doc.querySelectorAll("h1"));

  h1Elements.forEach((el, index) => {
    el.id = `heading-${index + 1}`;
  });

  cleanHtml = doc.body.innerHTML;

  const toc = h1Elements.map(el => ({
    id: el.id,
    text: el.textContent?.trim() || "",
  }));

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -86;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
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
        <h2 className="max-w-4xl text-xl font-semibold md:text-3xl text-custom-black">
          {blog.title}
        </h2>
        <div className="flex flex-wrap gap-6 text-sm font-medium text-accent-foreground ">
          <div className="flex items-center gap-2">
            <UserCircle2Icon className="w-5 h-5" />
            <span>{blog.author || "Unknown Author"}</span>
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
      <div className="flex flex-col md:flex-row md:gap-8 relative">
        <article
          className="rich-text prose max-w-none prose-indigo text-gray-800 flex-1 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        {toc.length > 0 && (
          <div className="hidden md:block md:w-[300px] lg:w-[350px] xl:w-[400px] h-auto max-h-[400px] overflow-y-auto sticky top-22 self-start p-4 border rounded-md bg-gray-50 shadow-sm font-poppins">
            <h3 className="font-semibold text-lg mb-3 border-b pb-2 text-gray-900">
              Table of Contents
            </h3>
            <ul className="space-y-2">
              {toc.map(item => (
                <li key={item.id}>
                  <button
                    className="text-gray-900 hover:text-gray-700 transition-colors duration-200 text-left w-full focus:outline-none cursor-pointer line-clamp-1"
                    onClick={() => scrollToHeading(item.id)}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </section>
  );
};

export default SingleBlogSection;