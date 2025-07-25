import React from "react";
import BlogsList from "./components/blogs-list";
// import HeroCarousel from "@/components/common/carousel/hero-carousel";

const BlogsPage = () => {
  return (
    <main className="space-y-8">
      {/* <HeroCarousel /> */}
      <BlogsList />
    </main>
  );
};

export default BlogsPage;
