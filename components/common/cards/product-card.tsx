// components/ProductCard.tsx
"use client";
import Image from "next/image";
import React from "react";
import { Heart, ShoppingBag } from "lucide-react";
import RatingStars from "../product/rating-stars";
import PriceRow from "../product/price-row";
// import { useRouter } from "next/navigation";
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
  alt,
  brandname,
  title,
  // price,
  rating,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) => {


  // const router = useRouter();
  return (

    <section className="w-full bg-white rounded-lg overflow-hidden">

      {/* Image Section */}
      <div className="relative mb-6 w-full h-[350px] overflow-hidden rounded-lg group cursor-pointer">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 right-3">
          <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            Fash Sale
          </span>
        </div>

        <div className="absolute top-3 left-3">
          <span className="bg-blue text-white text-sm font-semibold px-3 py-1 rounded-full">
            New
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pb-4 flex flex-col">
        <p className="text-[#7A7A7A] text-sm ">
          {brandname}
        </p>
        <h3 className="text-xl font-medium font-playfair text-foreground">{title}</h3>
      </div>

      {/* Rating and wishlist */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} />
          <span className="ml-2 text-foreground font-medium">
            ({rating.toFixed(1)})
          </span>
        </div>

        <button
          onClick={() => onToggleWishlist?.(id, isWishlisted ? true : false)}
          className={`p-1 rounded-full transition-colors ${isWishlisted ? "text-red" : "text-gray-400 hover:text-red-500"
            } cursor-pointer`}
          aria-label="Toggle Wishlist"
        >
          <Heart fill="red" stroke='red' className="w-6 h-6" />
        </button>
      </div>

      {/* Price row */}
      <PriceRow
        previousPrice={"3200"}
        price={"3000"}
      />
      {/* Add To Bag Button */}
      <button className="bg-pink w-full flex font-medium text-sm md:text-base uppercase flex-row gap-2 justify-center items-center py-2">
        <ShoppingBag className="w-4 h-4" />
        Add To Bag
      </button>

    </section>
  );
};

export default ProductCard;
