// components/ProductCard.tsx
"use client";
import Image from "next/image";
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import RatingStars from "../product/rating-stars";
import PriceRow from "../product/price-row";
import { useRouter } from "next/navigation";
import { ProductCardProps } from "@/types/product";

const ProductCard = ({
  slug,
  imageSrc,
  alt,
  isFlashSale,
  title,
  price,
  brand,
  rating,
  discountTag,
  // onToggleWishlist = () => { },
  isWishlisted,
}: ProductCardProps) => {


  const router = useRouter();
  return (

    <section className="flex flex-col justify-between w-full gap-2 overflow-hidden bg-white rounded-lg md:gap-3 lg:gap-4">

      {/* Image Section */}
      <div onClick={() => router.push(`/shop/product/${slug}`)} className="relative mb-2 w-full h-40 sm:h-60 md:h-72 lg:h-[350px] overflow-hidden rounded-lg group cursor-pointer">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 right-3">
          <span className="bg-red-600 text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
            { isFlashSale && "Flash Sale"}
          </span>
        </div>

        <div className="absolute top-3 left-3">
          <span className="bg-blue text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
            New
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col ">
        <p className="text-[#7A7A7A] text-xs line-clamp-1 sm:text-sm ">
          {brand?.name}
        </p>
        <h3 className="text-base font-medium md:text-lg lg:text-xl font-playfair text-foreground">
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        {/* Rating and wishlist */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RatingStars rating={rating} />
            <span className=" ml-0 md:ml-2 text-foreground text-[10px] md:text-base font-medium">
              ({rating.toFixed(1)})
            </span>
          </div>

          <button
            // onClick={() => onToggleWishlist?.(slug, isWishlisted ? true : false)}
            className={`p-1 md:p-2 rounded-full bg-[#FAFAFA] transition-colors ${isWishlisted ? "text-red" : "text-gray-400 hover:text-red-500"
              } cursor-pointer`}
            aria-label="Toggle Wishlist"
          >
            <Heart fill="red" stroke='red' className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Price row */}
        <PriceRow
          discountTag={discountTag}
          price={price}
        />
        {/* Add To Bag Button */}
        <button className="flex flex-row items-center justify-center w-full gap-2 py-2 text-xs font-medium uppercase bg-secondary sm:text-sm md:text-base">
          <ShoppingBag className="w-4 h-4" />
          Add To Bag
        </button>
      </div>

    </section>
  );
};

export default ProductCard;
