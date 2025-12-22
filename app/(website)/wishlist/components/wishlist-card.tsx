import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from 'lucide-react';
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import PriceRow from "@/components/common/product/price-row";
import RatingStars from "@/components/common/product/rating-stars";
import { decreaseWishlistCount } from "@/redux/features/wishList-slice";

interface WishlistCardProps {
  image: string;
  name: string;
  description: string;
  rating: number;
  previousPrice: string | undefined;
  price: string;
  discountTag: string;
  slug?: string;
  deleteWishlist: (slug: string) => void;
  setWishlistUpdates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

const WishlistCard = ({
  image,
  name,
  description,
  rating,
  previousPrice,
  discountTag,
  deleteWishlist,
  price,
  slug,
  setWishlistUpdates
}: WishlistCardProps) => {

  const dispatch = useDispatch();

  return (
    <div className="z-20 grid w-full gap-2 p-2 mt-5 border rounded-md sm:p-4 lg:p-3 sm:gap-4 grid-row-1 hover:shadow-md">
      <div className="grid grid-cols-[20%_75%] sm:grid-cols-[15%_82%] md:grid-cols-[20%_78%] lg:grid-cols-[25%_72%] xl:grid-cols-[15%_83%] 2xl:gap-6 2xl:grid-cols-[10%_88%] gap-4">
        {/* Image */}
        <Link href={`shop/${slug}`} className="w-full h-full">
          <div className="relative justify-center w-15 h-15 sm:w-18 sm:h-18 place-self-center sm:align-self-center md:w-32 md:h-32">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </Link>

        {/* Details */}
        <div className="grid w-full grid-cols-1 gap-2">
          {/* Rating */}
          <div className="flex justify-between ">
            <div className="flex items-center gap-2 md:gap-4">
              <RatingStars rating={rating} />
              <span className="text-base font-medium text-foreground md:text-lg">
                {rating}
              </span>
            </div>
            <X className="cursor-pointer !w-5 !h-5 !md:w-6 !md:h-6 text-black" onClick={() => {
              if (slug) {
                deleteWishlist(slug)
                dispatch(decreaseWishlistCount())
                setWishlistUpdates((prev) => ({
                  ...prev,
                  [slug]: false,
                }));
              }
            }} />
          </div>

          {/* Content */}
          <Link href={`shop/${slug}`} className="w-full h-full">
            <div className="flex flex-col w-full gap-2">

              <h3 className="text-base font-playfair line-clamp-1 md:text-2xl text-foreground">
                {name}
              </h3>
              {/* Dom Purify */}
              <p
                className={`!line-clamp-2 max-w-[58vw] text-xs leading-relaxed md:text-base md:block hidden `}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    description || "No description provided"
                  ),
                }}
              />
              {/* Price */}

              <PriceRow
                previousPrice={previousPrice}
                discountTag={discountTag}
                price={price}
              />
        </div>
          </Link>
      </div>
    </div>
    </div >
  );
};

export default WishlistCard;
