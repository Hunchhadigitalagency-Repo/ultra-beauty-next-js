import React from "react";
import LinkText from "@/components/common/header/link-text";
// import BlogCard from "@/app/(website)/components/blogs/blog-card";
import SectionHeader from "@/components/common/header/section-header";

const ReadMoreBlogs: React.FunctionComponent = () => {

  // const blogAuther = {
  //   id: 1,
  //   username: "Auther",
  // };
  // const defaultCategory = { id: 10, name: "General", is_active: true };

  return (
    <section className="space-y-6 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title="Read More"
          description="Read more blogs thate we have posted"
        />
        <LinkText title="See All" href="/blogs" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <BlogCard
          id={1}
          title="Blog 1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
          author={blogAuther}
          created_at="2023-01-01"
          cover_image="https://img.freepik.com/free-vector/blogging-word-concept_23-2147840840.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          sub_title="This is subtitle 1"
          category={defaultCategory}
        />

        <BlogCard
          id={2}
          title="Blog 2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
          author={blogAuther}
          created_at="2023-02-02"
          cover_image="https://img.freepik.com/free-vector/blogging-word-concept_23-2147840840.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          sub_title="This is subtitle 2"
          category={defaultCategory}
        />

        <BlogCard
          id={3}
          title="Blog 3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
          author={blogAuther}
          created_at="2023-03-03"
          cover_image="https://img.freepik.com/free-vector/blogging-word-concept_23-2147840840.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          sub_title="This is subtitle 3"
          category={defaultCategory}
        /> */}
      </div>
    </section>
  );
};

export default ReadMoreBlogs;
