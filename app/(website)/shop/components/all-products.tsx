"use client";
import { Menu } from "lucide-react";
import FilterSection from "./filter";
import React, { useState } from "react";
import ProductSort from "./product-sort";
// import { useDispatch } from "react-redux";
import { Result } from "@/types/product";
import MobileFilter from "./mobile-filter";
import { useAppSelector } from "@/redux/hooks";
import useCheckToken from "@/hooks/use-check-token";
import { useToggleWishlist } from "@/utils/wishList-utility";
import { useInfiniteFetch } from "@/hooks/use-infinite-fetch";
import SearchBox from "@/components/common/filter/search-box";
import ProductCard from "@/components/common/cards/product-card";
import SectionHeader from "@/components/common/header/section-header";
import { ScribbleProductCard } from "@/components/ui/product-scribble";

const AllProducts = () => {

  // const dispatch = useDispatch();
  const { isAuthenticated } = useCheckToken();
  const [showFilter, setShowFilter] = useState(false);
  const { selectedCategories } = useAppSelector(state => state.category);
  const { isLoggedIn } = useAppSelector((state) => state.authentication);
  const [wishlistUpdates, setWishlistUpdates] = useState<Record<string, boolean>>({});

  const toggleWishlist = useToggleWishlist();

  const categoryQuery = selectedCategories.length > 0
    ? `?category=${selectedCategories.join(',')}`
    : '';

  const path = `public-products${categoryQuery}`;

  const {
    data: products,
    loading,
  } = useInfiniteFetch<Result>(path, undefined, undefined, undefined, isLoggedIn);


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
        <SectionHeader title={`All Products (${210})`} description="" />
        <div className="hidden lg:flex lg:gap-5">
          <SearchBox placeholder="Search Products" />
          <ProductSort />
        </div>
        <Menu onClick={toggleFilter} className="w-5 h-5 text-foreground lg:hidden" />
      </div>
      <div className="flex flex-row gap-16">
        <FilterSection />
        <div className="flex-1">
          {loading || products?.length === 0 ? (
            <section>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <ScribbleProductCard key={index} />
                ))}
              </div>
            </section>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products?.map((product, index) => (
                <ProductCard
                  key={`${Math.random}${index}`}
                  slug={product.slug_name}
                  imageSrc={product.images?.[0]?.file}
                  alt={product.name}
                  isFlashSale={product.is_flash_sale}
                  title={product.name}
                  price={product.price}
                  discountTag={product.discount_percentage}
                  rating={product.average_rating}
                  isWishlisted={wishlistUpdates[product.slug_name] ?? product.my_wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {showFilter && <MobileFilter onclose={toggleFilter} />}
    </section>
  );
};

export default AllProducts;