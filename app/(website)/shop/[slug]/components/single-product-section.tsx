"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useFetchData from "@/hooks/use-fetch";
import useCheckToken from "@/hooks/use-check-token";
import { useToggleWishlist } from "@/utils/wishList-utility";
import ProductImagesSection from "./product-images-section";
import ProductDescriptionSection from "./product-description-section";
import SingleProductInformationLoader from "./single-product-information-loader";
import { allImages } from "@/lib/utils";
import { ProductImagesResponse, Result } from "@/types/product";

interface SingleProductResponse extends Result {
  id: number;
}

const SingleProductSection: React.FunctionComponent = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const toggleWishlist = useToggleWishlist();
  const { isAuthenticated } = useCheckToken();

  const { data, loading, error } = useFetchData<SingleProductResponse>(
    `public-products/${slug}`
  );

  // Wishlist state syncs when data arrives
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  useEffect(() => {
    if (data) setIsWishlisted(data.my_wishlist);
  }, [data]);

  const [activeImg, setActiveImg] = useState<string>("");

  // Show skeleton loader while loading
  if (loading) {
    return (
      <div className="mt-4 ml-4 sm:mt-6 sm:mx-14">
        <SingleProductInformationLoader />
      </div>
    );
  }

  // Show error if fetch fails
  if (error) return <div>Error loading product...</div>;
  if (!data) return null;

  const {
    images,
    general_description,
    flash_end_date,
    is_flash_sale,
    is_new,
    variants,
  } = data;

  const allImage = allImages(images, variants);

  const handleToggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toggleWishlist(slug, isWishlisted, isAuthenticated);
  };

  const getActiveVariantId = (id: number) => {
    const image = variants.find((item) => item.id === id)?.item_image;
    setActiveImg(image ?? "");
  };

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
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
        />
        <ProductDescriptionSection
          product={data as SingleProductResponse}
          getVariantId={getActiveVariantId}
        />
      </div>
    </section>
  );
};

export default SingleProductSection;
