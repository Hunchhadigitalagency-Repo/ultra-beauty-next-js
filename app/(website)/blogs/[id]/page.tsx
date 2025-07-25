import React from "react";
import ReadMoreBlogs from "./components/read-more-blogs";
import SingleBlogSection from "./components/single-blog-section";
import RecommendedProducts from "@/components/common/product/recommended-products";

const SingleBlogPage: React.FunctionComponent = () => {
  return (
    <main className="space-y-8">
      <SingleBlogSection />
      <ReadMoreBlogs />
      <RecommendedProducts />
    </main>
  );
};

export default SingleBlogPage;
