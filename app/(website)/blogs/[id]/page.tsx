import { Metadata } from "next";
import { IBlog } from "@/types/cms";
import apiBase from "@/services/api-base-instance";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await apiBase.get(`/cms/blogs-dropdown/${id}`);
    const blog: IBlog = await res.data;

    return {
      // title: blog.title,
      // description: blog.sub_title,
      openGraph: {
        title: blog.title,
        description: blog.sub_title,
        images: [
          {
            url: blog.cover_image,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        type: "article",
        publishedTime: blog.created_at,
        authors: [blog.author],
        tags: blog.tags?.split(",") || [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.sub_title,
        images: [blog.cover_image],
      },
    };
  } catch {
    return {
      title: "Blog | Website Name",
      description: "Read our latest blogs and updates.",
    };
  }
}

export { default } from "./components/client-page";
