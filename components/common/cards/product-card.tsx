"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import PriceRow from "../product/price-row";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RatingStars from "../product/rating-stars";
import { ProductCardProps } from "@/types/product";

const ProductCard = ({
  slug,
  imageSrc,
  alt,
  isFlashSale,
  title,
  price,
  rating,
  discountTag,
  brand,
  onToggleWishlist = () => {},
  isWishlisted,
  quantity
}: ProductCardProps) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = () => {
    setIsLoading(true);
    try {
      onToggleWishlist(slug, isWishlisted);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to open product page in a new tab
  const openProductInNewTab = () => {
    window.open(`/shop/${slug}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="flex flex-col justify-between w-full overflow-hidden bg-white md:gap-3 lg:gap-4">
      {/* Image Section */}
      <div
        onClick={openProductInNewTab}
        className="relative w-full h-40 mb-2 overflow-hidden rounded-lg cursor-pointer sm:h-60 md:h-72 lg:h-80 group"
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isFlashSale && (
          <div className="absolute top-2 right-2">
            <span className="bg-primary text-[#FFFFFF] font-poppins text-[10px] md:text-sm px-3 md:px-4 py-1 rounded-full">
              FLASH SALES
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3
          onClick={openProductInNewTab}
          className="!text-[12px] cursor-pointer md:text-lg line-clamp-1 font-poppins text-[#7A7A7A]"
        >
          {brand}
        </h3>
        <h3
          onClick={openProductInNewTab}
          className="text-lg md:2xl font-playfair font-medium cursor-pointer md:text-lg line-clamp-2 text-[#333333]"
        >
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 lg:gap-2">
        {/* Price row */}
        <PriceRow price={price} discountTag={discountTag} />

        {/* Rating and wishlist */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RatingStars rating={rating} />
            <span className="ml-0 text-xs font-medium md:ml-2 text-foreground md:text-base">
              {rating.toFixed(1)}
            </span>
          </div>

          <button
            onClick={handleWishlist}
            disabled={isLoading}
            className={`p-1 md:p-2 rounded-full bg-[#FAFAFA] transition-colors 
              ${isWishlisted ? "text-red" : "text-gray-400 hover:text-red-500"}
              cursor-pointer`}
            aria-label="Toggle Wishlist"
          >
          <Heart
  fill={isWishlisted ? "red" : "transparent"}
  stroke={isWishlisted ? "red" : "currentColor"}
  className="w-4 h-4 md:w-6 md:h-6 text-gray-500" 
/>
          </button>
        </div>

        {/* Add To Bag Button */}
        <Button
          onClick={openProductInNewTab}
          disabled={quantity === null}
          className={`flex flex-row rounded-sm items-center justify-center 
          w-full gap-2 py-2 text-xs sm:text-sm font-medium text-foreground
          ${quantity === null ? "bg-[#FAFAFA] text-[#7A7A7A]" : "bg-secondary hover:bg-primary hover:text-white  duration-300"}
          `}
        >
          <Eye className="w-4 h-4" />
          View Product
        </Button>
      </div>
    </section>
  );
};

export default ProductCard;
