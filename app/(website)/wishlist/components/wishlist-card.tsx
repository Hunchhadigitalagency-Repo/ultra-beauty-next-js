import React from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}: WishlistCardProps) => {

  const dispatch = useDispatch();

  return (

    <section className="relative flex flex-col gap-4 mt-5 md:flex-row">
      <div className="flex flex-row flex-1 gap-4 md:gap-6">
        {/* Image */}
        <div className="relative w-20 h-20 lg:w-32 lg:h-32">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {/* Details */}
        <div className="flex flex-col flex-1">
          {/* Rating */}
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2 md:gap-4">
              <RatingStars rating={rating} />
              <span className="text-base font-medium text-foreground md:text-lg">
                {rating}
              </span>
            </div>
            <Button
              variant="ghost"
              className="w-12 h-12 p-0"
              onClick={() => {
                if (slug !== undefined) {
                  deleteWishlist(slug)
                  dispatch(decreaseWishlistCount())
                }
              }
              }
            >
              <X className="!w-5 !h-5 !md:w-6 !md:h-6 text-black" />
            </Button>
          </div>
          {/* Content */}
          <div className="flex flex-col justify-between w-full gap-4 sm:flex-row">
            <div className="flex flex-col flex-1 gap-1">
              <h3 className="text-base font-normal md:text-2xl text-foreground">
                {name}
              </h3>
              {/* Dom Purify */}
              <p
                className="text-sm leading-relaxed md:text-base line-clamp-2 text-ellipsis"
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
            {/* Button */}
            <div className="flex items-center justify-end">
              <Button className="flex justify-center px-10 py-5 font-medium text-white rounded-full bg-primary">
                ADD TO CART
                <ShoppingCart className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistCard;
