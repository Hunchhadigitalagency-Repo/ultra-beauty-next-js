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
  const [searchValue, setSearchValue] = useState('');
  const [sortingValue, setSortingValue] = useState('');
  const [wishlistUpdates, setWishlistUpdates] = useState<Record<string, boolean>>({});

  const { selectedCategories, selectedBrands, priceRange } = useAppSelector(state => state.category);
  const { isLoggedIn } = useAppSelector((state) => state.authentication);

  if (selectedCategories.length > 0) {
    queryParams.set("category", selectedCategories.join(","));
  }

  if (searchValue) {
    queryParams.set("search", searchValue);
  }

  if (sortingValue) {
    queryParams.set('sort_by', sortingValue)
  }

  if (selectedBrands.length > 0) {
    queryParams.set("brand", selectedBrands.join(','))
  }

  if (priceRange[0] !== 100 || priceRange[1] !== 10000) {
    queryParams.set('min_price', priceRange[0].toString())
    queryParams.set('max_price', priceRange[1].toString())
  }

  const path = `public-products/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const {
    data: products,
    hasMore,
    count,
    fetchNext,
  } = useInfiniteFetch<Result>(path || "", "", "", "", !isLoggedIn);


  const handleToggleWishlist = (slug: string | undefined, isWishlisted: boolean | undefined) => {
    if (!slug) return;

    setWishlistUpdates((prev) => ({
      ...prev,
      [slug]: !isWishlisted,
    }));

    toggleWishlist(slug,
      isWishlisted,
      isAuthenticated)
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (

    <section className="relative flex flex-col gap-8 padding">
      <div className="flex flex-row items-center justify-between gap-4">
        <SectionHeader
          title={`All Products (${count})`}
          description=""
        />
        <div className="hidden lg:flex lg:gap-5">
          <SearchBox
            placeholder="Search Products"
            sendValue={handleSearchValue}
          />
          <ProductSort
            onChange={setSortingValue}
            selectedValue={sortingValue}
          />
        </div>
        <Menu
          onClick={toggleFilter}
          className="w-5 h-5 text-foreground lg:hidden"
        />
      </div>
      <div className="flex lg:flex-row lg:gap-16">
        <FilterSection
          showFilter={showFilter}
          onClose={toggleFilter}
        />
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
                You’ve reached the end!
              </p>
            }
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
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
                  isWishlisted={wishlistUpdates[product.slug_name] ?? product.my_wishlist}
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