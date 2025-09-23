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
import { deleteAllWishlist, deleteWishlist } from "@/lib/api/wishlist/wishlist-apis";

interface FlashProductResponse extends Result {
  id: number
}

const WishlistedProducts = () => {

  const toggleWishlist = useToggleWishlist();
  const { isAuthenticated, loading: authLoading } = useCheckToken();
  const [wishlistUpdates, setWishlistUpdates] = useState<Record<string, boolean>>({});
  const { data, loading, refetch } = useFetchData<WishListResponse>("/wishlists/", true);
  const { data: flashSaleProducts, loading: isLoading, error } = useFetchData<FlashProductResponse[]>("random-flash-sale-products/")

  useEffect(() => {
    refetch();
  }, [wishlistUpdates, refetch]);

  const wishListData = data?.results[0]?.products
  const dispatch = useDispatch();
  const deleteWishlistClient = async (slug: string) => {
    try {
      await deleteWishlist(slug);
      await refetch();
      toast.success('Item removed from wishlist');
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
        <div className='flex items-center justify-center w-full h-60'>
          <span className='text-red'>
            Please login first to view your wishlist.
          </span>
        </div>
      </section>
    );
  }

  const handleClearAllWishlist = () => {
    deleteAllWishlist().then(refetch)
    dispatch(setWishlistCount(0))
    setWishlistUpdates({});
  }

  const handleWishListClick = async (slug: string | undefined, isWishlisted: boolean | undefined) => {
    if (!slug) return;
    setWishlistUpdates((prev) => ({
      ...prev,
      [slug]: !isWishlisted,
    }));

    toggleWishlist(slug,
      isWishlisted,
      isAuthenticated)

  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[65%_28%] xl:grid-cols-[75%_22%] padding  gap-5 lg:gap-20">
      {/* Wishlisted Products */}
      <div >
        <div className="flex justify-between w-full">
          <SectionHeader
            title="Wishlist"
            description="Find all the products you liked"
          />
          {
            wishListData && wishListData.length > 0 && (
              <button
                onClick={handleClearAllWishlist}
                className="bg-[#EFEFEF] text-sm h-10  px-4 sm:text-sm sm:px-7 rounded-full cursor-pointer"
              >
                Clear All Wishlist
              </button>
            )
          }
        </div>

        <div className="flex flex-col gap-4">
          {
            loading ? (
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
                  previousPrice={product.discount_percentage ? product.price : undefined}
                  price={calculateDiscountedPrice(product.price, product.discount_percentage) || product.price}
                  discountTag={product.discount_percentage || ""}
                  slug={product.slug_name}
                  deleteWishlist={deleteWishlistClient}
                  setWishlistUpdates={setWishlistUpdates}
                />
              ))
            ) : (
              <div className='flex flex-col items-center justify-center w-full h-60'>
                <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
                <p className='text-sm font-extralight text-gray-400 capitalize'>
                  Oops! no wishlisted items found...
                </p>
              </div>
            )
          }
        </div>
      </div>

      {/* Flash Sale Products */}
      <div className="w-full p-2 font-medium md:p-4 lg:p-4">
        <h1 className="text-2xl uppercase">
          on sale
        </h1>

        {
          isLoading ? (
            <div className='flex items-center justify-center w-full h-60'>
              <p className='font-semibold text-base text-gray-400'>
                Loading...
              </p>
            </div>
          ) : error ? (
            <div className='flex flex-col items-center justify-center w-full h-60'>
              <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
              <p className='text-sm font-extralight text-gray-400'>
                Oops! Something went wrong...
              </p>
            </div>
          ) : flashSaleProducts?.length === 0 ? (
            <div className='flex flex-col items-center justify-center w-full h-60'>
              <AlertCircle className="w-8 h-8 mb-2 text-gray-400" />
              <p className='text-sm font-extralight text-gray-400 capitalize'>
                Oops! no sales products right now...
              </p>
            </div>
          ) : (
            flashSaleProducts?.map((product, index) => (
              <div key={index} className="flex flex-col gap-2 mt-8 shadow">
                <div className="relative w-full aspect-square ">
                  <Image src={product.images[0].file}
                    alt="image"
                    layout="fill"
                    className="object-cover"
                  />
                  {
                    product.is_flash_sale && (
                      <div className="absolute px-2 py-1 text-xs text-white rounded-full right-4 bottom-2 md:right-8 md:bottom-4 lg:bottom-1 lg:right-1 xl:bottom-2 xl:right-2 bg-primary">
                        <button className="px-1">
                          Flash Sale
                        </button>
                      </div>
                    )
                  }
                  <div className="absolute w-8 h-8 top-4 right-3 bg-[#EEEEEE] rounded-full text-black flex justify-center items-center md:w-10 md:h-10 md:top-8 md:right-8 lg:top-3 lg:right-1 lg:w-6 lg:h-6 xl:top-3 xl:right-3 xl:w-7 xl:h-7" onClick={() => handleWishListClick(product.slug_name, wishlistUpdates[product.slug_name])}>
                    <Heart
                      fill={wishlistUpdates[product.slug_name] ?? product.my_wishlist ? "red" : "transparent"}
                      stroke={wishlistUpdates[product.slug_name] ?? product.my_wishlist ? "red" : "black"}
                      className="w-7 h-7 md:w-8 md:h-8 lg:w-5 lg:h-5" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-4 py-2">
                  <h1 className="text-sm line-clamp-1 md:text-base xl:text-lg">
                    {product.name}
                  </h1>
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold md:text-base xl:text-md">
                      Nrs. {product.price}
                    </p>
                    {
                      product.flash_sale_discount && (
                        <p className="text-sm text-green-400 lg:text-md md:text-sm">
                          {product.flash_sale_discount.split(".")[0]}% OFF
                        </p>
                      )
                    }
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 py-2 text-sm text-white bg-primary">
                  <Link href={`/shop/${product.slug_name}`}>
                    View Product
                  </Link>
                </button>
              </div>
            )
            )
          )
        }
      </div>
    </section>
  );
};

export default WishlistedProducts;
