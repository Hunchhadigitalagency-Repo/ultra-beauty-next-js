"use client";

import React from "react";
import BlogForm from "../components/blog-form";
import { useAppSelector } from "@/redux/hooks";

const AddBlogsPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <BlogForm initialData={selectedData} />
    </div>
  );
};

export default AddBlogsPage;
