"use client";
import SectionHeader from "@/components/common/header/section-header";
import React, { useEffect, useState } from "react";
import WishlistCard from "./wishlist-card";
import useCheckToken from "@/hooks/use-check-token";
import useFetchDataToken from "@/hooks/use-fetch-data-token";
import WishlistCardSkeleton from "@/components/ui/wishlist-scribble-loader";
import { deleteWishlist } from "@/lib/api/wishlist/wishlist-apis";

interface Product {
  id: number;
  image: string;
  name: string;
  detail_description?: string;
  rating?: number;
  price?: string;
  discount_percentage?: string;
  created_at?: string;
}

interface WishlistEntry {
  id: number;
  user: number;
  created_at: string;
  products: Product[];
}

const WishlistedProducts = () => {
  const { isAuthenticated, loading: authLoading } = useCheckToken();
  const { data, loading } = useFetchDataToken<WishlistEntry[]>("/wishlists/");
  const [wishlistState, setWishlistState] = useState<Product[]>([]);

  const wishlistItems: Product[] = React.useMemo(() => {
    const isWishlistEntryArray = (data: any): data is WishlistEntry[] => {
      return Array.isArray(data) && data.length > 0 && 
             typeof data[0] === 'object' && 
             'products' in data[0] && 
             Array.isArray(data[0].products);
    };

    if (!isWishlistEntryArray(data)) {
      return [];
    }

    return data[0].products || [];
  }, [data]);

  useEffect(() => {
    if (data) {
      console.log("Fetched Wishlist Data:", data);
    }
  }, [data]);

  useEffect(() => {
    setWishlistState(wishlistItems);
  }, [wishlistItems]);

  const deleteWishlistClient = async (id: number) => {
    console.log("this is the id tobe deleted", id);
    await deleteWishlist(id);
    setWishlistState((prev) => prev.filter((item) => item.id !== id));
  };

  if (authLoading) {
    return <p className="padding text-sm text-gray-500">Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return (
      <section className="padding">
        <p className="text-red-500 text-sm text-center">
          Please login first to view your wishlist.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6 padding">
      <SectionHeader
        title="Wishlist"
        description="Find all the products you liked"
      />
      <div className="flex flex-col gap-8">
        {loading ? (
          <>
            <WishlistCardSkeleton />
            <WishlistCardSkeleton />
          </>
        ) : wishlistState.length > 0 ? (
          wishlistState.map((product) => (
            <WishlistCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              description={product.detail_description || ""}
              rating={product.rating ?? 4.5}
              previousPrice={product.price || "0"}
              price={product.price || "0"}
              discountTag={product.discount_percentage || "0%"}
              deleteWishlist={deleteWishlistClient}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">No wishlist items found.</p>
        )}
      </div>
    </section>
  );
};

export default WishlistedProducts;
