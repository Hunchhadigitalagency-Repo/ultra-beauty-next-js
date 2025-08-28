"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import PriceRow from "../product/price-row";
import { useRouter } from "next/navigation";
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
  onToggleWishlist = () => { },
  isWishlisted,
}: ProductCardProps) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = () => {
    setIsLoading(true);
    try {
      onToggleWishlist(slug, isWishlisted);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-between w-full gap-2 overflow-hidden bg-white rounded-lg md:gap-3 lg:gap-4">
      {/* Image Section */}
      <div
        onClick={() => router.push(`/shop/product/${slug}`)}
        className="relative w-full h-40 mb-2 overflow-hidden rounded-lg cursor-pointer sm:h-60 md:h-72 lg:h-80 group"
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isFlashSale && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-secondary text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
              Flash Sale
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3
          onClick={() => router.push(`/shop/product/${slug}`)}
          className="text-base cursor-pointer md:text-lg line-clamp-2 font-regular text-[#505050]"
        >
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        {/* Price row */}
        <PriceRow
          price={price}
          discountTag={discountTag}
        />
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
            className={`p-1 md:p-2 rounded-full bg-[#FAFAFA] transition-colors ${isWishlisted ? "text-red" : "text-gray-400 hover:text-red-500"
              } cursor-pointer`}
            aria-label="Toggle Wishlist"
          >
            <Heart
              fill={isWishlisted ? "red" : "transparent"}
              stroke={isWishlisted ? "red" : "black"}
              className="w-4 h-4 md:w-6 md:h-6"
            />
          </button>
        </div>

        {/* Add To Bag Button */}
        <Link href={`/shop/product/${slug}`} className="flex flex-row items-center justify-center w-full gap-2 py-2 text-xs font-medium text-white bg-primary sm:text-sm md:text-base">
          <Eye className="w-4 h-4" />
          View Product
        </Link>
      </div>
    </section>
  );
};

export default ProductCard;