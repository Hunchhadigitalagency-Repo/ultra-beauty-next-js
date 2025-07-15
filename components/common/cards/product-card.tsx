// components/ProductCard.tsx
"use client";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";
import RatingStars from "../product/rating-stars";
import PriceRow from "../product/price-row";
import { useRouter } from "next/navigation";
import { IFeature } from "@/types/product";

interface ProductCardProps {
  id: number;
  imageSrc: string;
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
  title,
  description,
  features,
  rating,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) => {
  const router = useRouter();
  console.log("this is the statuis", isWishlisted, id)
  console.log("this is the description", description)
  return (
    <section className="w-full bg-white rounded-lg overflow-hidden">
      <div className="relative mb-6 w-full h-[350px] overflow-hidden rounded-lg group cursor-pointer">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded">
            Fash Sale
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded">
            New
          </span>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className="bg-primary hover:bg-sky-500 text-white w-48 h-11 rounded-full flex items-center justify-center gap-2"
            onClick={() => router.push(`/shop/product/${id}`)}
          >
            VIEW PRODUCTS
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {features?.map((feat, i) => (
          <span
            key={i}
            className={`absolute  text-sm font-medium px-2 py-1 rounded shadow ${feat.position}`}
          >
            {feat.label}
          </span>
        ))}
      </div>

      <div className="pb-4 flex flex-col gap-2">
        <h3 className="text-xl font-medium text-orange">{title}</h3>
        <p className="text-foreground text-sm leading-relaxed line-clamp-2 text-ellipsis h-11">
          {description}
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} />
          <span className="ml-2 text-foreground font-medium">
            {rating.toFixed(1)}
          </span>
        </div>

        <button
          onClick={() => onToggleWishlist?.(id, isWishlisted ? true : false)}
          className={`p-1 rounded-full transition-colors ${isWishlisted ? "text-orange" : "text-gray-400 hover:text-orange"
            } cursor-pointer`}
          aria-label="Toggle Wishlist"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>

      <PriceRow
        previousPrice={"50000"}
        price={"40000"}
        discountTag={"10"}
        className="flex flex-row justify-between"
        priceClassname=" w-[200px] md:w-[250px]"
      />
    </section>
  );
};

export default ProductCard;
