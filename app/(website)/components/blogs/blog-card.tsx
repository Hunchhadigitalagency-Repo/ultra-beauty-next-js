"use client";
import React from "react";
import Image from "next/image";
import { IBlog } from "@/types/blogs";
import { useRouter } from "next/navigation";
import { Calendar, UserCircle2Icon } from "lucide-react";

const BlogCard: React.FunctionComponent<IBlog> = ({
  slug,
  sub_title,
  title,
  author,
  cover_image,
  created_at
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
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">
            No Image
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold line-clamp-1 font-playfair text-foreground">
        {title}
      </h3>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-accent-foreground">
          <UserCircle2Icon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {author || "Unknown Author"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-accent-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">
            {formattedDate}
          </span>
        </div>
      </div>
      <p className="overflow-hidden text-sm font-normal text-foreground text-ellipsis line-clamp-2">
        {sub_title}
      </p>
    </section>
  );
};

export default BlogCard;