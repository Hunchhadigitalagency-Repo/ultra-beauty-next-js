"use client";

import { Button } from "@/components/ui/button";
import { IBlog } from "@/types/cms";
import { Calendar, Eye, UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

// export interface BlogCardProps {
//   id: number;
//   title: string;
//   sub_title?: string;
//   author: { id: number; name: string; is_active: boolean };
//   category?: { id: number; name: string; is_active: boolean };
//   cover_image?: string;
//   created_at: string;
//   description: string;
//   features?: IFeature[];
// }

const BlogCard = ({
  title,
  sub_title,
  author,
  category,
  cover_image,
  created_at,
  description,
}: // features,
IBlog) => {
  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <section className="w-full rounded-lg overflow-hidden space-y-2">
      <div className="relative mb-6 w-full h-[400px] overflow-hidden rounded-lg group cursor-pointer">
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

        {/* VIEW BLOG overlay */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className="bg-primary hover:bg-sky-500 text-white w-48 h-11 rounded-full flex items-center justify-center gap-2"
            onClick={() => {}}
          >
            VIEW BLOG
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Feature badges */}
        {/* {features?.map((feat, i) => (
          <span
            key={i}
            className={`absolute text-sm font-medium px-2 py-1 rounded shadow ${feat.position}`}
          >
            {feat.label}
          </span>
        ))} */}
      </div>

      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {sub_title && (
        <p className="text-sm text-muted-foreground">{sub_title}</p>
      )}

      <div className="flex items-center gap-4 justify-between">
        <div className="text-accent-foreground flex items-center gap-2">
          <UserCircle2Icon className="w-4 h-4" />
          <span className="font-medium text-sm">
            {author.username || "Unknown Author"}
          </span>
        </div>

        {category?.name && (
          <div className="text-accent-foreground flex items-center gap-2">
            <span className="font-medium text-sm">{category.name}</span>
          </div>
        )}

        <div className="text-accent-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="font-medium text-sm">{formattedDate}</span>
        </div>
      </div>

      <p
        className="text-foreground text-sm text-ellipsis overflow-hidden line-clamp-2"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      />
    </section>
  );
};

export default BlogCard;