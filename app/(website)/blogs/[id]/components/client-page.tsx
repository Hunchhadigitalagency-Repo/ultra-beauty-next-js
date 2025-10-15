import React from "react";
import SingleBlogSection from "./single-blog-section";
import ReadMoreBlogs from "./read-more-blogs";
// import RecommendedProducts from "@/components/common/product/recommended-products";

const SingleBlogPage: React.FunctionComponent = () => {
  return (
    <main className="space-y-8">
      <SingleBlogSection />
      <ReadMoreBlogs />
      {/* <RecommendedProducts /> */}
    </main>
  );
};

export default SingleBlogPage;
