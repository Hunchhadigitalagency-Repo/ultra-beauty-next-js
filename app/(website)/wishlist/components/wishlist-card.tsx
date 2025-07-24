import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceRow from "@/components/common/product/price-row";
import RatingStars from "@/components/common/product/rating-stars";

interface WishlistCardProps {
  id: number;
  image: string;
  name: string;
  description: string;
  rating: number;
  previousPrice: string;
  price: string;
  discountTag: string;
  deleteWishlist: (id: number) => void;
}

const WishlistCard = ({
  id,
  image,
  name,
  description,
  rating,
  previousPrice,
  price,
  discountTag,
  deleteWishlist,
}: WishlistCardProps) => {
  console.log("this is the product id", id);
  return (
    <section className="relative flex flex-col md:flex-row gap-4">
      <div className="flex gap-4 md:gap-6 flex-row flex-1">
        {/* Discount Tag */}
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={150}
            height={150}
            className="rounded-lg object-cover border w-full h-full"
          />
          {discountTag && (
            <span className="absolute  bg-primary text-white text-xs md:text-sm px-2 py-1 rounded-full right-2 bottom-2">
              {Math.floor(Number(discountTag))}% Off
            </span>
          )}
        </div>
          {/* rating */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-4">
            <div className="flex items-center gap-2 md:gap-4">
              <RatingStars rating={rating} />
              <span className="font-medium text-foreground text-base md:text-lg">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          {/* Wishlist Card Name */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 lg:gap-24 mt-3 md:w-4/5">
            <div className="flex flex-col gap-2 sm:gap-4 flex-1">
              <h3 className="text-base md:text-2xl text-foreground font-playfair font-bold">
                {name}
              </h3>
              {/* Dom Purify */}
              <p
                className="text-sm md:text-base leading-relaxed line-clamp-2 text-ellipsis"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    description || "No description provided"
                  ),
                }}
              />
              {/* Current Price and Previous Price */}
              <PriceRow
                previousPrice={previousPrice}
                price={price}
                className="justify-start lg:gap-12  flex flex-col md:flex-row "
                discountClassName="text-[15px] md:text-sm w-[100px]"
                priceClassname="w-[220px] md:w-[300px] "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex items-center">
        <Button className="flex w-full md:w-[250px]  font-medium h-12 rounded-full bg-primary text-white justify-center">
          ADD TO CART <ShoppingCart className="ml-2" />
        </Button>
      </div>

      <Button
        variant="ghost"
        className="absolute top-[-15px] right-[-25px] md:top-0 md:right-0 w-12 h-12 p-0"
        onClick={() => deleteWishlist(id)}
      >
        <X className="!w-5 !h-5 !md:w-6 !md:h-6 text-black" />
      </Button>
    </section>
  );
};

export default WishlistCard;
