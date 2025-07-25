"use client";
import React from "react";
import { Product } from "@/types/website";
import { useParams } from "next/navigation";
import ProductImagesSection from "./product-images-section";
import { useFetchProduct } from "@/hooks/use-fetch-product";
import RatingStars from "@/components/common/product/rating-stars";
import ProductDescriptionSection from "./product-description-section";
// import SectionHeader from "@/components/common/header/section-header";

const SingleProductSection: React.FunctionComponent = () => {

  const params = useParams();
  const id = params?.id as string;
  const rating = 4.5;

  const { data: product, loading } = useFetchProduct<Product>(`products/${id}`);
  console.log(product)
  if (loading || !product) {
    return <div className="padding">Loading...</div>;
  }

  return (
    <section className="padding space-y-6">
      <div>
        <div className="flex justify-end pl-8 w-full  mb-4">
          <div className="flex justify-between w-1/2">
            <span className="font-poppins font-medium text-sm text-[#7A7A7A]">
              Ubiya Derma
            </span>
            <div className="flex ">
              <RatingStars rating={rating} />
              <span className="text-sm text-[#333333]">
                {rating}/5 Star Rating by 349 people
              </span>
            </div>
          </div>

        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <ProductImagesSection
            images={product.images}
            description={product.detail_description}
          />
          <ProductDescriptionSection
            product={product}
          />
        </div>

      </div>

    </section>
  );
};

export default SingleProductSection;
