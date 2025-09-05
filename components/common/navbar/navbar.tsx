"use client";

import Link from "next/link";
import MegaMenu from "./mega-menu";
import MobileMenu from "./mobile-menu";
import SearchModal from "./search-modal";
import { ChevronDown } from 'lucide-react';
import { CartResponse } from "@/types/cart";
import useFetchData from "@/hooks/use-fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WishListResponse } from "@/types/wishlist";
import NotificationModal from "./notification-modal";
import { ICategoryDropdown } from "@/types/dropdown";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { setCartCount } from "@/redux/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWishlistCount } from "@/redux/features/wishList-slice";
import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
} from "lucide-react";

export default function Navbar() {

  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hasFetched = useRef({ cart: false, wishlist: false });
  const [showNotification, setShowNotification] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const isActive = (pathname: string) => path === pathname;
  const { wishlistCount } = useAppSelector((state) => state.navbar);
  const cartCount = useAppSelector((state) => state.cart.cartCount);
  const { isLoggedIn, accessToken } = useAppSelector((state) => state.authentication);

  const { data: dropdownCategoryData } = useFetchData<ICategoryDropdown[]>(`dropdown/category/`);

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

  const shopByCategoryRef = useRef<HTMLLIElement>(null);


  const handleCategoryEnter = () => {
    setIsDropdownVisible(true);
  }

  const handleCategoryLeave = () => {
    setIsDropdownVisible(false);
  }

  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      if (
        shopByCategoryRef.current &&
        !shopByCategoryRef.current?.contains(event.target as Node)
      ) {
        console.log(shopByCategoryRef, "if bata navbar")
        setIsDropdownVisible(false);
      } else {
        console.log(shopByCategoryRef, "else bata navbar")
        setIsDropdownVisible(true);
      }
    };

    document.addEventListener('mousedown', handleMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleMouseClick);
    };
  }, []);


  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-secondary"
    >
      <div className="py-2 padding-x">

        {/* Search Popup */}
        {searchOpen && <SearchModal />}

        {/* Mega Menu */}
        {isDropdownVisible && <MegaMenu
          dropdownCategoriesData={dropdownCategoryData}
          setDropdownVisible={setIsDropdownVisible}
        />}

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
          <nav className="items-center justify-center hidden w-full h-full lg:flex">
            <ul className="h-full lg:max-w-[50vw] lg:gap-6 lg:text-sm xl:max-w-[60vw] flex justify-center items-center w-full xl:gap-14 xl:text-[15px]">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li className="h-full flex items-center" ref={shopByCategoryRef} onMouseEnter={handleCategoryEnter}
                onMouseLeave={handleCategoryLeave}
              >
                <button className="flex items-center justify-center gap-1 cursor-pointer" >
                  <p className="line-clamp-1">Shop by Category</p>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownVisible
                    ? "rotate-180"
                    : ""
                    }`} />
                </button>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
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
              {isLoggedIn && wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute flex items-center justify-center p-1 text-xs rounded-full size-4 -top-2 -right-2"
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
