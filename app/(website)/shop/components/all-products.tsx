"use client";

import React from "react";
import FilterSection from "./filter";
import { useParams } from "next/navigation";
import useCheckToken from "@/hooks/use-check-token";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "@/components/common/cards/product-card";
import { createWishList } from "@/lib/api/wishlist/wishlist-apis";
import SectionHeader from "@/components/common/header/section-header";
import { ScribbleProductCard } from "@/components/ui/product-scribble";
import { useInfiniteFetchNoToken } from "@/hooks/use-infinite-fetch-no-token";
import SearchBox from "@/components/common/filter/search-box";


const AllProducts = () => {

  const id = useParams().id as string;
  const path = id ? `products/?category=${id}` : "products";

  const { isAuthenticated } = useCheckToken()
  const { data: products, loading, hasMore, fetchNext } = useInfiniteFetchNoToken(path, 6);

  console.log("this is the product details ", products);

  const toggleWishList = (id: number) => {
    if (!isAuthenticated) {
      return;
    }
    const response = createWishList(id);
    console.log('this is the whish list updated', response)
  }

  if (loading && products.length === 0) {
    return (
      <section className="padding space-y-8">
        <SectionHeader
          title="All Products"
          description="Get list of the items here so you can buy"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <ScribbleProductCard key={index} />
          ))}
        </div>
      </section>
    );
  };


  return (

    <section className="padding flex flex-col gap-8">
      <div className="flex items-center flex-col md:flex-row justify-between gap-4">
        <SectionHeader title={`All Products (${210})`} description="" />
        <SearchBox placeholder="Search Products" />
      </div>
      <div className="flex flex-row gap-16">
        <FilterSection />
        <div className="flex-1">
          <InfiniteScroll
            dataLength={products.length}
            next={fetchNext}
            hasMore={hasMore}
            loader={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {[...Array(3)].map((_, index) => (
                  <ScribbleProductCard key={index} />
                ))}
              </div>
            }
            endMessage={
              <p className="text-center text-sm text-muted-foreground mt-4">
                You’ve reached the end!
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  price={`Nrs. ${product.price}`}
                  imageSrc={product.images?.[0]?.file || "/fallback-image.jpg"}
                  alt={product.name}
                  description={product.description}
                  rating={product.rating || 5}
                  isWishlisted={product.my_wishlist}
                  onToggleWishlist={toggleWishList}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;