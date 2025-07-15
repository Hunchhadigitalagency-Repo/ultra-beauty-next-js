import React from "react";
import SingleBlogSection from "./components/single-blog-section";
import ReadMoreBlogs from "./components/read-more-blogs";
import RecommendedProducts from "../../../../components/common/product/recommended-products";

const SingleBlogPage = () => {
  return (
    <main className="space-y-8">
      <SingleBlogSection />
      <ReadMoreBlogs />
      <RecommendedProducts />
    </main>
  );
};

export default SingleBlogPage;
