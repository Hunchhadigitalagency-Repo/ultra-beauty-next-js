import HeroCarousel from "@/components/common/carousel/hero-carousel";
import React from "react";
import BlogsList from "./components/blogs-list";

const BlogsPage = () => {
  return (
    <main className="space-y-8">
      <HeroCarousel />
      <BlogsList />
    </main>
  );
};

export default BlogsPage;
