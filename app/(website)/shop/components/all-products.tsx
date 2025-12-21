"use client";

import { Menu } from "lucide-react";
import FilterSection from "./filter";
import React, { useState } from "react";
import ProductSort from "./product-sort";
import { Result } from "@/types/product";
import { useAppSelector } from "@/redux/hooks";
import useCheckToken from "@/hooks/use-check-token";
import { useToggleWishlist } from "@/utils/wishList-utility";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import SearchBox from "@/components/common/filter/search-box";
import ProductCard from "@/components/common/cards/product-card";
import SectionHeader from "@/components/common/header/section-header";
import { ScribbleProductCard } from "@/components/ui/product-scribble";

const AllProducts = () => {
  const toggleWishlist = useToggleWishlist();
  const { isAuthenticated } = useCheckToken();

  const queryParams = new URLSearchParams();

  const [showFilter, setShowFilter] = useState(false);
  const [sortingValue, setSortingValue] = useState("");
  const [wishlistUpdates, setWishlistUpdates] = useState<
    Record<string, boolean>
  >({});
  const { searchQuery } = useAppSelector((state) => state.filter);
  const { selectedCategories, selectedBrands, priceRange } = useAppSelector(
    (state) => state.category
  );
  const { isLoggedIn } = useAppSelector((state) => state.authentication);
if(searchQuery){
    queryParams.set("search", searchQuery);
}
  if (selectedCategories.length > 0) {
    queryParams.set("category", selectedCategories.join(","));
  }

  if (sortingValue) {
    queryParams.set("sort_by", sortingValue);
  }

  if (selectedBrands.length > 0) {
    queryParams.set("brand", selectedBrands.join(","));
  }

  if (priceRange[0] !== 100 || priceRange[1] !== 10000) {
    queryParams.set("min_price", priceRange[0].toString());
    queryParams.set("max_price", priceRange[1].toString());
  }

  const path = `public-products/${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const {
    data: products,
    hasMore,
    count,
    fetchNext,
  } = useInfiniteFetch<Result>(path || "", "", "", "", !isLoggedIn);

  const handleToggleWishlist = (
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

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section className="relative flex flex-col gap-8 padding" id="shop">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        {/* Mobile Menu */}
        <Menu
          onClick={toggleFilter}
          className="w-5 h-5 text-foreground lg:hidden cursor-pointer"
        />
      </div>

      {/* Sticky Search + Sort - Desktop */}
      <div className="hidden lg:flex justify-between bg-white items-center sticky top-20 p-2 z-20  pb-4 -mt-2">
        <SectionHeader title={`All Products (${count})`} description="" />
        <div className="flex gap-4 items-start justify-end">
          <SearchBox placeholder="Search Products" />
          <ProductSort
            onChange={setSortingValue}
            selectedValue={sortingValue}
          />
        </div>
      </div>

      {/* Mobile Search + Sort */}
      <div className="lg:hidden flex flex-col gap-4">
        <SearchBox placeholder="Search Products" />
        <ProductSort onChange={setSortingValue} selectedValue={sortingValue} />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* Sticky Filter */}
        <div className="lg:w-1/4 xl:w-1/5">
          <div className="lg:sticky lg:top-35 lg:h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
            <FilterSection showFilter={showFilter} onClose={toggleFilter} />
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          <InfiniteScroll
            dataLength={products.length}
            next={fetchNext}
            hasMore={hasMore}
            scrollThreshold={0.5}
            loader={
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <ScribbleProductCard key={index} />
                ))}
              </div>
            }
            endMessage={
              <p className="mt-4 text-sm text-center text-muted-foreground">
                You&lsquo;ve reached the end!
              </p>
            }
          >
            <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
              {products?.map((product, index) => (
                <ProductCard
                  key={index}
                  slug={product?.slug_name}
                  imageSrc={product?.images?.[0]?.file}
                  alt={product.name}
                  isFlashSale={product.is_flash_sale}
                  brand={product.brand?.name}
                  title={product.name}
                  price={product.price}
                  discountTag={product.discount_percentage}
                  rating={product.average_rating}
                  isWishlisted={
                    wishlistUpdates[product.slug_name] ?? product.my_wishlist
                  }
                  onToggleWishlist={handleToggleWishlist}
                  quantity={product.quantity}
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
