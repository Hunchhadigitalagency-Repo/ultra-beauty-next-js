"use client";

import React from 'react';
import useFetchData from "@/hooks/use-fetch";
import CategoryProduct from '../product/category-product';
import { FeaturedCategoriesResponse } from '@/types/featured-categories';


const FeaturedProductCategories = () => {
    const { data: featuredCategories, loading, error } =
        useFetchData<FeaturedCategoriesResponse[]>(`categories/featured-categories/`);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='Featured-Category'>
            {
                featuredCategories?.map(featuredCategory => (
                    <CategoryProduct
                        key={featuredCategory?.id}
                        featuredCategoryId={featuredCategory?.id}
                        featuredCategory={featuredCategory}
                    />
                ))
            }
        </div>
    )
}

export default FeaturedProductCategories