"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import WishlistCard from "./wishlist-card";
import useFetchData from "@/hooks/use-fetch";
import { WishListResponse } from "@/types/wishlist";
import useCheckToken from "@/hooks/use-check-token";
import { calculateDiscountedPrice } from "@/lib/cart-utils";
import { setWishlistCount } from "@/redux/features/wishList-slice";
import SectionHeader from "@/components/common/header/section-header";
import WishlistCardSkeleton from "@/components/ui/wishlist-scribble-loader";
import { deleteAllWishlist, deleteWishlist } from "@/lib/api/wishlist/wishlist-apis";
import { Result } from "@/types/product";

interface FlashProductResponse extends Result {
  id: number
}

const WishlistedProducts = () => {

  const { isAuthenticated, loading: authLoading } = useCheckToken();


  const { data, loading, refetch } = useFetchData<WishListResponse>("/wishlists/", true);

  const { data: flashSaleProducts, loading: isLoading, error } = useFetchData<FlashProductResponse[]>("random-flash-sale-products/")


  const wishListData = data?.results[0]?.products
  const dispatch = useDispatch();

  console.log(flashSaleProducts, "flash sale products");

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
      <section className="padding ">
        <p className="text-sm text-center text-red-500">
          Please login first to view your wishlist.
        </p>
      </section>
    );
  }

  const handleClearAllWishlist = () => {
    deleteAllWishlist().then(refetch)
    dispatch(setWishlistCount(0))
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[65%_28%] xl:grid-cols-[75%_22%] padding  gap-5 lg:gap-20">
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
                className="bg-[#EFEFEF] h-10 px-7 rounded-full cursor-pointer"
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
              wishListData?.map((product) => (
                <Link
                  key={product.slug_name}
                  href={`/shop/product/${product.slug_name}`}>
                  <WishlistCard
                    image={product.image}
                    name={product.name}
                    description={product.general_description || ""}
                    rating={product.average_rating}
                    previousPrice={product.discount_percentage ? product.price : undefined}
                    price={calculateDiscountedPrice(product.price, product.discount_percentage) || product.price}
                    discountTag={product.discount_percentage || ""}
                    slug={product.slug_name}
                    deleteWishlist={deleteWishlistClient}
                  />
                </Link>

              ))
            ) : (
              <p className="text-sm text-center pt-51 text-muted-foreground">
                No wishlisted items found.
              </p>
            )
          }
        </div>
      </div>
      <div className="w-full p-2 font-medium md:p-4 lg:p-4">
        <h1 className="text-2xl uppercase">
          on sale
        </h1>

        {
          isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong</p>
          ) : flashSaleProducts?.length === 0 ? (
            <p>No sale products found</p>
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
                  <div className="absolute w-8 h-8 top-4 right-3 bg-[#EEEEEE] rounded-full text-black flex justify-center items-center md:w-10 md:h-10 md:top-8 md:right-8 lg:top-3 lg:right-1 lg:w-6 lg:h-6 xl:top-3 xl:right-3 xl:w-7 xl:h-7">
                    <CiHeart className="w-7 h-7 md:w-8 md:h-8 lg:w-5 lg:h-5" />
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
                  <Link href={`/shop/product/${product.slug_name}`}>
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
