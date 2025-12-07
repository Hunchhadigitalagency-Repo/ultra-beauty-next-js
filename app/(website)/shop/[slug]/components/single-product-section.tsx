"use client";

import {
  ProductImagesResponse,
  // ProductImagesSectionProps
  Result
} from "@/types/product";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import useFetchData from "@/hooks/use-fetch";
import useCheckToken from "@/hooks/use-check-token";
import ProductImagesSection from "./product-images-section";
import { useToggleWishlist } from "@/utils/wishList-utility";
import ProductDescriptionSection from "./product-description-section";
import SingleProductInformationLoader from "./single-product-information-loader";
import { allImages } from "@/lib/utils";

interface SingleProductResponse extends Result {
  id: number
}

const SingleProductSection: React.FunctionComponent = () => {

  const params = useParams();
  const slug = params?.slug as string;
  const toggleWishlist = useToggleWishlist();
  const { isAuthenticated } = useCheckToken();
  const { data, loading, error } = useFetchData<SingleProductResponse>(`public-products/${slug}`);
  const [isWishlisted, setIsWishlisted] = useState<boolean | undefined>(data?.my_wishlist);
  const [activeImg, setActiveImg] = useState('')

  if (!data || loading) return <div className="mt-4 ml-4 sm:mt-6 sm:mx-14"><SingleProductInformationLoader /></div>;
  if (error) return <div>Error...</div>;
  const {
    images,
    general_description,
    flash_end_date,
    is_flash_sale,
    is_new,
    variants
  } = data;
  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toggleWishlist(
      slug,
      isWishlisted,
      isAuthenticated
    );
  };
  const allImage = allImages(images, variants)
  
  const getActiveVariantId = (id: number) => {
    const image = variants.find(item => item.id === id)?.item_image;
    setActiveImg(image)
  }

  return (
    <section className="space-y-6 padding">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductImagesSection
          images={allImage as ProductImagesResponse[]}
          description={general_description}
          flashEndDate={flash_end_date}
          is_flash_sale={is_flash_sale}
          is_new={is_new}
          active_image={activeImg}
          isWishlisted={isWishlisted ?? data?.my_wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
        <ProductDescriptionSection
          product={
            data as SingleProductResponse
          }
          getVariantId={getActiveVariantId}
        />
      </div>
    </section>
  );
};

export default SingleProductSection;
