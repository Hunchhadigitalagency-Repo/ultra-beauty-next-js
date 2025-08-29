"use client";

import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
} from "lucide-react";
import Link from "next/link";
import MegaMenu from "./mega-menu";
import MobileMenu from "./mobile-menu";
import SearchModal from "./search-modal";
import { ChevronDown } from 'lucide-react';
import { CartResponse } from "@/types/cart";
import useFetchData from "@/hooks/use-fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { WishListResponse } from "@/types/wishlist";
import NotificationModal from "./notification-modal";
import { ICategoryDropdown } from "@/types/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { setCartCount } from "@/redux/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWishlistCount } from "@/redux/features/wishList-slice";

export default function Navbar() {

  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hasFetched = useRef({ cart: false, wishlist: false });
  const [showNotification, setShowNotification] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const isActive = (pathname: string) => path === pathname;

  const { isLoggedIn, accessToken } = useAppSelector((state) => state.authentication);
  const { wishlistCount } = useAppSelector((state) => state.navbar);
  const cartCount = useAppSelector((state) => state.cart.cartCount);

  const { data } = useFetchData<ICategoryDropdown[]>(`dropdown/category/`);

  const { data: wishListData } = useFetchData<WishListResponse>('/wishlists/', false, {
    config: { headers: { Authorization: `Bearer ${accessToken}` } }
  });

  const { data: cartData } = useFetchData<CartResponse>('carts', false, {
    config: { headers: { Authorization: `Bearer ${accessToken}` } }
  });

  useEffect(() => {
    if (wishListData && !hasFetched.current.wishlist) {
      const count = wishListData.results.reduce((sum, item) => sum + (item.products?.length || 0), 0);
      dispatch(setWishlistCount(count));
      hasFetched.current.wishlist = true;
    }

    if (cartData && !hasFetched.current.cart) {
      dispatch(setCartCount(cartData.results?.length || 0));
      hasFetched.current.cart = true;
    }
  }, [wishListData, cartData, dispatch]);

  const handleCategoryEnter = (id: number | null) => {
    setIsDropdownVisible(true);
    setActiveCategory(id);
  };

  const handleCategoryClick = (id: number) => {
    console.log(id)
    router.push('/shop');
    setIsDropdownVisible(false);
  }

  const handleCategoryLeave = () => {
    setIsDropdownVisible(false);
  };

  const selectedCategory = data?.find(item => item.id === activeCategory);
  const subCategoriesData = selectedCategory?.subcategories || [];
  const hasSubcategories = selectedCategory && selectedCategory.subcategories.length >= 1 ? true : false;


  return (
    <header className="relative  top-0 z-50 border-b border-gray-200 bg-secondary"
      onMouseLeave={handleCategoryLeave}>
      <div className="py-2 padding-x">

        {/* Search Popup */}
        {searchOpen && <SearchModal />}

        {/* Mega Menu */}
        {isDropdownVisible && <MegaMenu
          isDropDownVisible={isDropdownVisible}
          hasSubcategories={hasSubcategories}
          dropdownProducts={subCategoriesData}
          setDropdownVisible={setIsDropdownVisible} />}

        {/* Notification */}
        {showNotification && (
          <NotificationModal onClose={() => setShowNotification(false)} />
        )}

        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-base font-medium leading-none text-center whitespace-nowrap md:text-xl font-playfair text-primary">
              Ultra Beauty
              <br />
              <span className="text-sm font-poppins md:text-base">&</span>
              <br />
              Brand
            </span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="items-center justify-center hidden w-full space-x-8 lg:flex">
            <div className="flex items-center justify-center">
              <div className="flex gap-8 static-nav md:text-sm">
                <p className="nav-link">
                  <Link href="/">
                    Home
                  </Link></p>
                <p className="nav-link pr-7">
                  <Link href="/shop">
                    GlowShop
                  </Link></p>
              </div>

              {/* navbar for fetched cateogries */}
              <div className="max-w-[300px] text-sm  md:text-sm lg:max-w-[300px] xl:max-w-[480px]">
                {data &&
                  data?.length < 5 ? (
                  <div className="flex gap-8">
                    {data?.slice(0, 4).map((category) => (
                      <button
                        key={category.id}
                        className="flex items-center w-auto gap-1 text-white cursor-pointer font-poppins whitespace-nowrap"
                        onMouseEnter={() => handleCategoryEnter(category.id)}
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        {category.name}
                        {category?.subcategories?.length > 0 && <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${activeCategory === category.id && isDropdownVisible
                            ? "rotate-180"
                            : ""
                            }`}
                        />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {data?.map((category) => (
                      <button
                        key={category.id}
                        className="flex items-center w-auto gap-1 text-black cursor-pointer font-poppins whitespace-nowrap snap-start"
                        onMouseEnter={() => handleCategoryEnter(category.id)}
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        {category.name}
                        {category?.subcategories?.length > 0 && <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${activeCategory === category.id && isDropdownVisible
                            ? "rotate-180"
                            : ""
                            }`}
                        />}
                      </button>
                    ))}
                  </div>
                )
                }
              </div>
            </div>
          </nav>
          {/* Right side icons */}
          <div className="flex items-center gap-4 md:gap-1 xl:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-primary md:text-sm"
            >
              <Search className={`size-5 md:size-4 xl:size-5 ${searchOpen && "text-primary"}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-primary"
              onClick={() => router.push("/wishlist")}
            >
              <Heart className={`size-5 md:size-4 xl:size-5 ${isActive("/wishlist") && "text-primary"}`} />
              {wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute flex items-center justify-center size-4 p-1 text-xs rounded-full -top-2 -right-2"
                >
                  {wishlistCount}
                </Badge>
              )
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-primary"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart
                className={`size-5 md:size-4 xl:size-5 ${isActive("/cart") && "text-primary"}`}
              />
              {
                isLoggedIn && cartCount > 0 &&
                <Badge
                  variant="destructive"
                  className="absolute flex items-center justify-center p-0 text-xs rounded-full -top-2 -right-2 size-4"
                >
                  {cartCount}
                </Badge>
              }
            </Button>
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary"
                onClick={() => router.push("/profile")}
              >
                <CircleUser
                  className={`size-5 md:size-4 xl:size-5 ${isActive("/profile") && "text-primary"
                    }`}
                />
              </Button>
            ) : (
              ""
            )}
            <Button
              onClick={() => setShowNotification((prev) => !prev)}
              variant="ghost"
              size="icon"
              className="hidden md:flex hover:text-primary"
            >
              <Bell className="size-5 md:size-4 xl:size-5" />
            </Button>
            {/* Mobile menu */}
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div >
    </header >
  );
}
