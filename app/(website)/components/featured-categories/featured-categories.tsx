"use client";

import React from "react";
import useFetchData from "@/hooks/use-fetch";
import CategoryProduct from "../product/category-product";
import { FeaturedCategoriesResponse } from "@/types/featured-categories";
import { AlertCircle } from "lucide-react";

const FeaturedProductCategories = () => {
  const {
    data: featuredCategories,
    loading,
    error,
  } = useFetchData<FeaturedCategoriesResponse[]>(
    `categories/featured-categories/`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Featured-Category">
      {loading ? (
        <div className="flex items-center justify-center w-full h-60">
          <p className="font-extralight text-sm text-gray-400">
            Loading Featured Categories...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center w-full h-60">
          <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
          <p className="font-extralight text-sm text-gray-400">
            Oops! Something went wrong...
          </p>
        </div>
      ) : featuredCategories?.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-60">
          <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
          <p className="font-extralight text-sm text-gray-400 capitalize">
            Oops! no Featured Categories right now...
          </p>
        </div>
      ) : (
        featuredCategories?.map((featuredCategory) => (
          <CategoryProduct
            key={featuredCategory?.id}
            featuredCategoryId={featuredCategory?.id}
            featuredCategory={featuredCategory}
          />
        ))
      )}
    </div>
  );
};

export default FeaturedProductCategories;
