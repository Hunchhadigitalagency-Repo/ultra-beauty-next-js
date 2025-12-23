"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { AlertCircle, Heart } from "lucide-react";
import { Result } from "@/types/product";
import { useDispatch } from "react-redux";
import WishlistCard from "./wishlist-card";
import useFetchData from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { WishListResponse } from "@/types/wishlist";
import useCheckToken from "@/hooks/use-check-token";
import { calculateDiscountedPrice } from "@/lib/cart-utils";
import { useToggleWishlist } from "@/utils/wishList-utility";
import { setWishlistCount } from "@/redux/features/wishList-slice";
import SectionHeader from "@/components/common/header/section-header";
import WishlistCardSkeleton from "@/components/ui/wishlist-scribble-loader";
import {
  deleteAllWishlist,
  deleteWishlist,
} from "@/lib/api/wishlist/wishlist-apis";

interface FlashProductResponse extends Result {
  id: number;
}

const WishlistedProducts = () => {
  const toggleWishlist = useToggleWishlist();
  const { isAuthenticated, loading: authLoading } = useCheckToken();
  const [wishlistUpdates, setWishlistUpdates] = useState<
    Record<string, boolean>
  >({});
  const { data, loading, refetch } = useFetchData<WishListResponse>(
    "/wishlists/",
    true
  );
  const {
    data: flashSaleProducts,
    loading: isLoading,
    error,
  } = useFetchData<FlashProductResponse[]>("random-flash-sale-products/", true);

  useEffect(() => {
    refetch();
  }, [wishlistUpdates, refetch]);

  const wishListData = data?.results[0]?.products;
  const dispatch = useDispatch();
  const deleteWishlistClient = async (slug: string) => {
    try {
      await deleteWishlist(slug);
      refetch();
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error(`Error removing item from wishlist: ${error}`);
    }
  };

  if (authLoading) {
    return (
      <p className="text-sm text-gray-500 padding">
        Checking authentication...
      </p>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="padding">
        <div className="flex items-center justify-center w-full h-60">
          <span className="text-red">
            Please login first to view your wishlist.
          </span>
        </div>
      </section>
    );
  }

  const handleClearAllWishlist = () => {
    deleteAllWishlist();
    refetch();
    dispatch(setWishlistCount(0));
    setWishlistUpdates({});
  };

  const handleWishListClick = async (
    slug: string | undefined,
    isWishlisted: boolean | undefined
  ) => {
    if (!slug) return;
    setWishlistUpdates((prev) => ({
      ...prev,
      [slug]: !isWishlisted,
    }));

    toggleWishlist(slug, isWishlisted, isAuthenticated);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[65%_28%] xl:grid-cols-[75%_22%] padding  gap-5 lg:gap-20">
      {/* Wishlisted Products */}
      <div>
        <div className="flex justify-between w-full">
          <SectionHeader
            title="Wishlist"
            description="Find all the products you liked"
          />
          {wishListData && wishListData.length > 0 && (
            <button
              onClick={handleClearAllWishlist}
              className="bg-[#EFEFEF] text-sm h-10  px-4 sm:text-sm sm:px-7 rounded-full cursor-pointer"
            >
              Clear All Wishlist
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <React.Fragment>
              <WishlistCardSkeleton />
              <WishlistCardSkeleton />
            </React.Fragment>
          ) : wishListData && wishListData.length > 0 ? (
            wishListData?.map((product, index) => (
              <WishlistCard
                key={index}
                image={product.image}
                name={product.name}
                description={product.general_description || ""}
                rating={product.average_rating}
                previousPrice={
                  product.discount_percentage ? product.price : undefined
                }
                price={
                  calculateDiscountedPrice(
                    product.price,
                    product.discount_percentage,
                    product.flash_sale_discount,
                    product.is_flash_sale
                  ) || product.price
                }
                discountTag={
                  product.is_flash_sale
                    ? product.flash_sale_discount || ""
                    : product.discount_percentage || ""
                }
                slug={product.slug_name}
                deleteWishlist={deleteWishlistClient}
                setWishlistUpdates={setWishlistUpdates}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-60">
              <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm font-extralight text-gray-400 capitalize">
                Oops! no wishlisted items found...
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full p-2 md:p-4 lg:p-6">
        <h1 className="text-2xl font-bold uppercase mb-6">On Sale</h1>

        {isLoading ? (
          <div className="flex items-center justify-center w-full h-60">
            <p className="font-semibold text-gray-400 text-base">Loading...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center w-full h-60">
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm font-light text-gray-400">
              Oops! Something went wrong...
            </p>
          </div>
        ) : flashSaleProducts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-60">
            <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
            <p className="text-sm font-light text-gray-400 capitalize">
              Oops! No sale products right now...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {flashSaleProducts?.map((product, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.images[0].file}
                    alt={product.name}
                    layout="fill"
                    className="object-cover"
                  />

                  {/* Flash Sale Badge */}
                  {product.is_flash_sale && (
                    <div className="absolute px-3 py-1 text-xs text-white rounded-full right-3 bottom-3 bg-primary font-semibold">
                      Flash Sale
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <div
                    className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                    onClick={() =>
                      handleWishListClick(
                        product.slug_name,
                        wishlistUpdates[product.slug_name]
                      )
                    }
                  >
                    <Heart
                      fill={
                        wishlistUpdates[product.slug_name] ??
                        product.my_wishlist
                          ? "red"
                          : "transparent"
                      }
                      stroke={
                        wishlistUpdates[product.slug_name] ??
                        product.my_wishlist
                          ? "red"
                          : "black"
                      }
                      className="w-5 h-5"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-2 p-4">
                  <h1 className="text-sm font-medium line-clamp-1 md:text-base">
                    {product.name}
                  </h1>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold md:text-base">
                      Nrs. {product.price}
                    </p>
                    {product.flash_sale_discount && (
                      <p className="text-sm font-semibold text-green-500 md:text-base">
                        {product.flash_sale_discount.split(".")[0]}% OFF
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/shop/${product.slug_name}`}
                    className="mt-2 inline-block w-full text-center py-2 text-sm text-white bg-primary rounded-md hover:bg-primary/90 transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistedProducts;
