"use client";

import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { IBlog } from "@/types/cms";
import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
import { Calendar, UserCircle2Icon } from "lucide-react";


const BlogCard: React.FunctionComponent<IBlog> = ({
  slug,
  title,
  author,
  cover_image,
  created_at,
  description,
}) => {
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : "";

  const router = useRouter();

  return (
    <section className="w-full rounded-lg overflow-hidden space-y-2 border-[1px] border-[#D7D7D7] p-3">
      <div onClick={() => { router.push(`/blogs/${slug}`) }} className="relative mb-6 w-full h-[400px] overflow-hidden rounded-lg group cursor-pointer">
        {cover_image ? (
          <Image
            src={cover_image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-xl font-playfair font-semibold text-foreground">
        {title}
      </h3>

      <div className="flex items-center gap-4 justify-between">
        <div className="text-accent-foreground flex items-center gap-2">
          <UserCircle2Icon className="w-4 h-4" />
          <span className="font-medium text-sm">
            {author?.username || "Unknown Author"}
          </span>
        </div>

        <div className="text-accent-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="font-medium text-sm">
            {formattedDate}
          </span>
        </div>
      </div>

      <p
        className="text-foreground font-normal text-sm text-ellipsis overflow-hidden line-clamp-2"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description || "") }}
      />
    </section>
  );
};

export default BlogCard;