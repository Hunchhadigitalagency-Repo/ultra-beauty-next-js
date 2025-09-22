"use client";
import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import SearchModal from "./search-modal";
import { ChevronDown } from 'lucide-react';
import { CartResponse } from "@/types/cart";
import useFetchData from "@/hooks/use-fetch";
import { Badge } from "@/components/ui/badge";
import Logo from '@/assets/images/Artboard 2-02.svg'
import { Button } from "@/components/ui/button";
import { WishListResponse } from "@/types/wishlist";
import NotificationModal from "./notification-modal";
import { ICategoryDropdown } from "@/types/dropdown";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { setCartCount } from "@/redux/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWishlistCount } from "@/redux/features/wishList-slice";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop by Category", isDropdown: true },
  { name: "Blogs", href: "/blogs" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

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
  const { data: cartData } = useFetchData<CartResponse>('carts/', false, {
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryEnter = () => {
    setIsDropdownVisible(true);
  }

  const handleCategoryLeave = () => {
    setIsDropdownVisible(false);
  }

  const handleDropdownEnter = () => {
    setIsDropdownVisible(true);
  };
  const handleDropdownLeave = () => {
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopByCategoryRef.current && !shopByCategoryRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 "
    >
      <div className="py-2 padding-x bg-secondary">

        {/* Notification */}
        {showNotification && (
          <NotificationModal onClose={() => setShowNotification(false)} />
        )}

        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className=" flex items-center justify-center">
            <div className=" relative w-40 lg:w-52 h-20">
              <Image
                src={Logo}
                alt="logo"
                fill
              />
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="items-center justify-center hidden w-full h-full lg:flex">
            <div className="relative h-full w-full">
              {
                !searchOpen &&
                <ul className="h-full lg:max-w-[50vw] lg:gap-6 lg:text-sm xl:max-w-[60vw] flex justify-center items-center w-full xl:gap-14 xl:text-[15px]">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className={`transition-all duration-200 hover:text-primary ${item.isDropdown ? "flex items-center h-full" : ""
                        }`}
                      ref={item.isDropdown ? shopByCategoryRef : undefined}
                      onMouseEnter={item.isDropdown ? handleCategoryEnter : undefined}
                      onMouseLeave={item.isDropdown ? handleCategoryLeave : undefined}
                    >
                      {item.isDropdown ? (
                        <button
                          className={`flex items-center justify-center gap-1 transition-transform duration-200 cursor-pointer hover:text-primary ${isDropdownVisible ? "text-primary" : ""
                            }`}
                        >
                          <p className="transition-all duration-200 line-clamp-1 text-xs xl:text-sm">
                            {item.name}
                          </p>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isDropdownVisible ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      ) : (
                        <Link
                          className="text-xs xl:text-sm"
                          href={item.href!}
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              }
              {/* Search Bar */}
              {searchOpen &&
                <div className="absolute z-50 w-[90%] transform -translate-x-1/2 left-1/2 top-3 transition-all duration-300">
                  <SearchModal onClose={() => setSearchOpen(!searchOpen)} />
                </div>
              }
            </div>
          </nav>
          {/* Right side icons */}
          <div className="flex items-center gap-1 md:gap-1 xl:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden lg:block hover:text-primary md:text-sm"
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
                className="relative hidden md:flex md:items-center md:justify-center hover:text-primary"
                onClick={() => router.push("/profile")}
              >
                <CircleUser
                  className={` size-5 md:size-4 xl:size-5 ${isActive("/profile") && "text-primary"
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
        {/* Mega Menu */}
        {
          isDropdownVisible &&
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 z-50 pt-5 transition-all ease-in-out dropdown-outer top-18 duration-800"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div
              className="h-full overflow-hidden overflow-y-scroll bg-white shadow-xl shadow-bottom scrollbar-hide"
            >
              {/* Categories Grid */}
              <div className="border-t padding">
                <div className="grid grid-cols-5 grid-flow-row auto-rows-[50px] gap-3 py-1">
                  <Link
                    href="/shop"
                    className='flex items-center justify-center transition-all duration-200 border rounded-sm hover:bg-secondary hover:text-primary hover:border-primary'
                    onClick={() => setIsDropdownVisible(false)}
                  >
                    <p className='text-sm whitespace-nowrap font-poppins'>All Products</p>
                  </Link>
                  {
                    dropdownCategoryData?.map((individualDropdownCategory) => (
                      <Link
                        key={individualDropdownCategory.id}
                        href={`/shop/${individualDropdownCategory.id}`}
                        className='flex items-center justify-center transition-all duration-200 border rounded-sm hover:bg-secondary hover:text-primary hover:border-primary'
                        onClick={() => setIsDropdownVisible(false)}
                      >
                        <p className="text-sm whitespace-nowrap font-poppins">
                          {individualDropdownCategory.name}
                        </p>
                      </Link>
                    ))
                  }
                </div>
              </div >
            </div >
          </div>
        }
      </div >

      <div className="bg-white relative h-[8vh] py-2 lg:hidden padding-x">
        <div className="absolute z-50 transform -translate-x-1/2 left-1/2 top-2 min-w-[250px] sm:min-w-[400px]">
          <SearchModal onClose={() => setSearchOpen(!searchOpen)} />
        </div>
      </div>
    </header >
  );
}