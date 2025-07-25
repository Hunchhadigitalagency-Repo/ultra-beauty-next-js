// components/ProductCard.tsx
"use client";
import Image from "next/image";
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import RatingStars from "../product/rating-stars";
import PriceRow from "../product/price-row";
import { useRouter } from "next/navigation";
import { IFeature } from "@/types/product";

interface ProductCardProps {
  id: number;
  imageSrc: string;
  brandname?: string;
  alt: string;
  title: string;
  description: string;
  features?: IFeature[];
  rating: number;
  /** the current, active price */
  price: string;
  /** optional old price to show crossed out */
  previousPrice?: string;
  /** e.g. "20% OFF", "Save $30" */
  discountTag?: string;
  onAddToCart?: () => void;
  onToggleWishlist?: (id: number, isWishlisted: boolean) => void;
  isWishlisted?: boolean;
}

const ProductCard = ({
  id,
  imageSrc,
  // alt,
  brandname,
  title,
  // price,
  rating,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) => {


  const router = useRouter();
  return (

    <section className="w-full bg-white flex flex-col justify-between gap-2 md:gap-3 lg:gap-4 rounded-lg overflow-hidden">

      {/* Image Section */}
      <div onClick={() => router.push(`/shop/product/${id}`)} className="relative mb-2 w-full h-40 sm:h-60 md:h-72 lg:h-[350px] overflow-hidden rounded-lg group cursor-pointer">
        <Image
          src={imageSrc}
          alt={''}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 right-3">
          <span className="bg-red-600 text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
            Fash Sale
          </span>
        </div>

        <div className="absolute top-3 left-3">
          <span className="bg-blue text-white text-[10px] md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full">
            New
          </span>
        </div>
      </div>

      {/* Content */}
      <div className=" flex flex-col">
        <p className="text-[#7A7A7A] text-xs sm:text-sm">
          {brandname}
        </p>
        <h3 className="text-base md:text-lg lg:text-xl font-medium font-playfair text-foreground">
          {title}
        </h3>
      </div>

      <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
        {/* Rating and wishlist */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RatingStars rating={rating} />
            <span className=" ml-0 md:ml-2 text-foreground text-[10px] md:text-base font-medium">
              ({rating.toFixed(1)})
            </span>
          </div>

          <button
            onClick={() => onToggleWishlist?.(id, isWishlisted ? true : false)}
            className={`p-1 md:p-2 rounded-full bg-[#FAFAFA] transition-colors ${isWishlisted ? "text-red" : "text-gray-400 hover:text-red-500"
              } cursor-pointer`}
            aria-label="Toggle Wishlist"
          >
            <Heart fill="red" stroke='red' className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Price row */}
        <PriceRow
          previousPrice={"3200"}
          price={"3000"}
        />
        {/* Add To Bag Button */}
        <button className="bg-secondary w-full flex font-medium text-xs sm:text-sm md:text-base uppercase flex-row gap-2 justify-center items-center py-2">
          <ShoppingBag className="w-4 h-4" />
          Add To Bag
        </button>
      </div>

    </section>
  );
};

export default ProductCard;
