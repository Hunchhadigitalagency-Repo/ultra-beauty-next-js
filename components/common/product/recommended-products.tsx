"use client"
import ProductCard from "@/components/common/cards/product-card";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";
import useFetchData from "@/hooks/use-fetch";
import { IBlog } from "@/types/cms";
import { useParams } from "next/navigation";
import React from "react";

const RecommendedProducts = () => {

  const id = useParams().id;
  const path = id ? `cms/blogs/${id}` : "";


  const { data, loading, error } = useFetchData<IBlog>(path, true);

  interface RecommendedProduct {
    id: number
    name: string
    slug_name: string
    image: string;
  }

  return (
    <section className="space-y-6 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title="Recommended Products"
          description="Products that people buy together"
        />
        <LinkText href="/" title="Go to Shop" />
      </div>
      {
        loading ? (
          <p>Loading blog...</p>
        ) : error ? (
          <p>Failed to load blog.</p>
        ) : data?.recommended_products?.length === 0 ?
          (
            <p>No recommended products</p>)
          : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              data?.recommended_products?.map((product: RecommendedProduct, index) =>
              (<ProductCard
                key={index}
                title={product?.name}
                imageSrc={product?.image}
                slug={product?.slug_name}
                alt={product?.name}
                rating={4.5}
                price="$24,000"
                discountTag="20% OFF"
                onAddToCart={() => console.log("Add to Cart")}
              />)
              )
            }
          </div>
          )
      }
    </section>
  );
};

export default RecommendedProducts;
