"use client";
import React from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import WishlistCard from "./wishlist-card";
import { ShoppingCart } from "lucide-react";
import useFetchData from "@/hooks/use-fetch";
import { WishListResponse } from "@/types/wishlist";
import useCheckToken from "@/hooks/use-check-token";
import WishListData from "@/constants/wishlist-data";
import { decreaseWishlistCount } from "@/redux/features/wishList-slice";
import SectionHeader from "@/components/common/header/section-header";
import WishlistCardSkeleton from "@/components/ui/wishlist-scribble-loader";
import { deleteAllWishlist, deleteWishlist } from "@/lib/api/wishlist/wishlist-apis";


const WishlistedProducts = () => {

  const { isAuthenticated, loading: authLoading } = useCheckToken();
  const { data, loading, refetch } = useFetchData<WishListResponse>("/wishlists/", true);
  const wishListData = data?.results[0]?.products
  const dispatch = useDispatch();


  const deleteWishlistClient = (slug: string) => {
    deleteWishlist(slug);
    refetch()
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
    dispatch(decreaseWishlistCount())

  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[75%_20%] padding  gap-5 lg:gap-20">
      <div >
        <div className="flex justify-between w-full">
          <SectionHeader
            title="Wishlist"
            description="Find all the products you liked"
          />
          {wishListData && wishListData.length > 0 && (
            <button
              onClick={handleClearAllWishlist}
              className="bg-[#EFEFEF] h-10 px-7 rounded-full cursor-pointer"
            >
              Clear All Wishlist
            </button>
          )}

        </div>

        <div className="flex flex-col gap-8 ">
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
                previousPrice={product.price || "0"}
                price={product.price || "0"}
                discountTag={product.discount_percentage || "0%"}
                slug={product.slug_name}
                deleteWishlist={deleteWishlistClient}
              />
            ))
          ) : (
            <p className="text-sm text-center text-gray-500">
              No wishlist items found.
            </p>
          )}
        </div>
      </div>
      <div className="bg-[#EEEEEE] font-medium p-2 md:p-4 lg:p-4">
        <h1 className="text-2xl ">
          ON SALES
        </h1>
        {WishListData.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 ">
            <div className="relative self-center w-72 md:w-96 lg:w-full aspect-square ">
              <Image src={item.image}
                alt="image"
                layout="fill"
                className="object-cover"
              />
              <div className="absolute px-2 py-1 text-xs text-white rounded-full right-2 md:right-4 md:bottom-12 lg:right-4 xl:bottom-9 bottom-9 bg-secondary">
                <button>
                  On Discount
                </button>
              </div>
              <div className="absolute top-8 md:top-15 xl:top-8 right-2 md:right-4 bg-[#EEEEEE] rounded-full text-black flex justify-center items-center w-5 h-5">
                <CiHeart />
              </div>
            </div>
            <div>
              <h1 className="text-sm md:text-base xl:text-lg">
                {item.title}
              </h1>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold md:text-base xl:text-lg">
                {item.price}
              </p>
              <p className="text-sm text-green-600 md:text-base xl:text-lg">
                {item.dicount}
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 py-2 text-sm text-white bg-primary">
              <span>
                Add To Cart
              </span>
              <span>
                <ShoppingCart />
              </span>
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};

export default WishlistedProducts;
