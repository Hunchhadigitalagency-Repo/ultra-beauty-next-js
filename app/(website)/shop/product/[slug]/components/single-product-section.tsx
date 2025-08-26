"use client";

import React, { useState } from "react";
import {
  ProductImagesResponse,
  //  ProductImagesSectionProps, 
  Result
} from "@/types/product";
import { useParams } from "next/navigation";
import useFetchData from "@/hooks/use-fetch";
import useCheckToken from "@/hooks/use-check-token";
import ProductImagesSection from "./product-images-section";
import { useToggleWishlist } from "@/utils/wishList-utility";
// import ProductDescriptionSection from "./product-description-section";

interface SingleProductResponse extends Result {
  id: number
}

const SingleProductSection: React.FunctionComponent = () => {

  const params = useParams();
  const slug = params?.slug as string;
  const { data, loading, error } = useFetchData<SingleProductResponse>(`public-products/${slug}`);
  const { isAuthenticated } = useCheckToken();
  const [isWishlisted, setIsWishlisted] = useState<boolean | undefined>(
    data?.my_wishlist
  );
  const toggleWishlist = useToggleWishlist();

  if (!data || loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  const {
    images,
    general_description,
    flash_end_date,
    is_flash_sale } = data;
  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toggleWishlist(
      slug,
      isWishlisted,
      isAuthenticated
    );
  };

  return (
    <section className="space-y-6 padding">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImagesSection
          images={images as ProductImagesResponse[]}
          description={general_description}
          flashEndDate={flash_end_date}
          is_flash_sale={is_flash_sale}
          isWishlisted={isWishlisted ?? data?.my_wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
        {/* <ProductDescriptionSection
          product={data as SingleProductResponse}
        /> */}
      </div>
    </section>
  );
};

export default SingleProductSection;
