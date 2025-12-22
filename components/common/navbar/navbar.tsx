"use client";
import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
  X,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import SearchModal from "./search-modal";
import { ChevronDown } from "lucide-react";
import { CartResponse } from "@/types/cart";
import useFetchData from "@/hooks/use-fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WishListResponse } from "@/types/wishlist";
import Logo from "@/assets/images/Artboard 2-02.svg";
import NotificationModal, { NotificationResponse } from "./notification-modal";
import { ICategoryDropdown } from "@/types/dropdown";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { setCartCount } from "@/redux/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setWishlistCount } from "@/redux/features/wishList-slice";
import {
  resetFilters,
  toggleBrands,
  toggleCategory,
  toggleSubcategory,
} from "@/redux/features/category-slice";
import { getCompanyProfile } from "@/lib/company-profile";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop by Category", isDropdown: true },
  { name: "Brands", isDropdown: true },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export interface IBrandDropdown {
  id: number;
  name: string;
  image: string | null;
}

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hasFetched = useRef({ cart: false, wishlist: false });
  const [showNotification, setShowNotification] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] =
    useState<ICategoryDropdown | null>(null);
  const isActive = (pathname: string) => path === pathname;
  const { wishlistCount } = useAppSelector((state) => state.navbar);
  const cartCount = useAppSelector((state) => state.cart.cartCount);
  const { isLoggedIn, accessToken } = useAppSelector(
    (state) => state.authentication
  );
  const [categoryPosition, setCategoryPosition] = useState<number>();
  const [icon, setIcon] = useState<string>();

  const { data: dropdownCategoryData } = useFetchData<ICategoryDropdown[]>(
    `dropdown/category?is_not_empty=True`
  );
  const { data: brandDropdownData } =
    useFetchData<IBrandDropdown[]>(`brand-dropdown/`);
  const {
    data: notifications,
    loading,
    error,
  } = useFetchData<NotificationResponse[]>(
    "/cms/notifications/all-notification/"
  );

  const { data: wishListData } = useFetchData<WishListResponse>(
    "/wishlists/",
    false,
    {
      config: { headers: { Authorization: `Bearer ${accessToken}` } },
    }
  );
  const { data: cartData } = useFetchData<CartResponse>("carts/", false, {
    config: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  useEffect(() => {
    if (wishListData && !hasFetched.current.wishlist) {
      const count = wishListData.results.reduce(
        (sum, item) => sum + (item.products?.length || 0),
        0
      );
      dispatch(setWishlistCount(count));
      hasFetched.current.wishlist = true;
    }
    if (cartData && !hasFetched.current.cart) {
      dispatch(setCartCount(cartData.results?.length || 0));
      hasFetched.current.cart = true;
    }
  }, [wishListData, cartData, dispatch]);

  useEffect(() => {
    dispatch(resetFilters());
    const fetchNavigationItems = async () => {
      const { company } = await getCompanyProfile();
      setIcon(company.company_logo_url);
    };
    fetchNavigationItems();
  }, []);

  const shopByCategoryRef = useRef<HTMLLIElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCategoryEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleCategoryLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleBrandEnter = () => {
    setIsBrandDropdownVisible(true);
  };

  const handleBrandLeave = () => {
    setIsBrandDropdownVisible(false);
  };

  const handleDropdownEnter = () => {
    setIsDropdownVisible(true);
  };
  const handleDropdownLeave = () => {
    setIsDropdownVisible(false);
    setHoveredCategory(null);
  };

  const handleBrandDropdownEnter = () => {
    setIsBrandDropdownVisible(true);
  };
  const handleBrandDropdownLeave = () => {
    setIsBrandDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shopByCategoryRef.current &&
        !shopByCategoryRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryCardClick = (
    categoryId: number,
    subcategoryId: number
  ) => {
    setIsDropdownVisible(false);
    dispatch(resetFilters());
    dispatch(toggleCategory({ id: categoryId, checked: true }));
    dispatch(toggleSubcategory({ id: subcategoryId, checked: true }));
    setHoveredCategory(null);
    router.push(`/shop#shop`);
  };

  const handleBrandCardClick = (brandId: number) => {
    setIsBrandDropdownVisible(false);
    dispatch(resetFilters());
    dispatch(toggleBrands({ id: brandId, checked: true }));
    setHoveredCategory(null);
    router.push(`/shop#shop`);
  };

  const searchAreaRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchIconRef.current &&
        searchIconRef.current.contains(event.target as Node)
      ) {
        const searchState = !searchOpen;
        setSearchOpen(searchState);
      }
      if (
        searchAreaRef.current &&
        !searchAreaRef.current.contains(event.target as Node) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 ">
      <div className="py-2 padding-x bg-secondary">
        {/* Notification */}
        {showNotification && (
          <NotificationModal
            onClose={() => setShowNotification(false)}
            data={notifications}
            loading={loading}
            error={error}
          />
        )}

        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className=" flex items-center justify-center">
            <div className=" relative w-40 lg:w-52 h-20">
              {icon && <Image src={icon ?? Logo} alt="logo" fill />}
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="items-center justify-center hidden w-full h-full lg:flex">
            <div className="relative h-full w-full">
              {!searchOpen && (
                <ul className="h-full lg:max-w-[50vw] lg:gap-6 lg:text-sm xl:max-w-[60vw] flex justify-center items-center w-full xl:gap-14 xl:text-[15px]">
                  {navItems.map((item, index) => (
                    <li
                      key={index}
                      className={`transition-all duration-200 hover:text-primary ${
                        item.isDropdown ? "flex items-center h-full" : ""
                      }`}
                      ref={item.isDropdown ? shopByCategoryRef : undefined}
                      onMouseEnter={
                        item.isDropdown && item.name === "Shop by Category"
                          ? handleCategoryEnter
                          : item.name === "Brands"
                          ? handleBrandEnter
                          : undefined
                      }
                      onMouseLeave={
                        item.isDropdown && item.name === "Shop by Category"
                          ? handleCategoryLeave
                          : item.name === "Brands"
                          ? handleBrandLeave
                          : undefined
                      }
                    >
                      {item.isDropdown ? (
                        <button
                          className={`flex items-center justify-center gap-1 transition-transform duration-200 cursor-pointer hover:text-primary ${
                            (item.name === "Shop by Category" &&
                              isDropdownVisible) ||
                            (item.name === "Brands" && isBrandDropdownVisible)
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          <p className="transition-all duration-200 line-clamp-1 text-xs xl:text-sm">
                            {item.name}
                          </p>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              (item.name === "Shop by Category" &&
                                isDropdownVisible) ||
                              (item.name === "Brands" && isBrandDropdownVisible)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <Link className="text-xs xl:text-sm" href={item.href!}>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {/* Search Bar */}
              {searchOpen && (
                <div
                  ref={searchAreaRef}
                  className="absolute z-50 w-[90%] transform -translate-x-1/2 left-1/2 top-3 transition-all duration-300"
                >
                  <SearchModal onClose={() => setSearchOpen(!searchOpen)} />
                </div>
              )}
            </div>
          </nav>
          {/* Right side icons */}
          <div className="flex items-center gap-1 md:gap-1 xl:gap-4">
            <Button
              variant="ghost"
              size="icon"
              // onClick={() => setSearchOpen(!searchOpen)}
              ref={searchIconRef}
              className="hidden lg:block hover:text-primary md:text-sm"
            >
              {searchOpen ? (
                <X
                  className={`size-5 md:size-4 xl:size-5 ${
                    searchOpen && "text-primary"
                  }`}
                />
              ) : (
                <Search
                  className={`size-5 md:size-4 xl:size-5 ${
                    searchOpen && "text-primary"
                  }`}
                />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-primary"
              onClick={() => router.push("/wishlist")}
            >
              <Heart
                className={`size-5 md:size-4 xl:size-5 ${
                  isActive("/wishlist") && "text-primary"
                }`}
              />
              {isLoggedIn && wishlistCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute flex items-center justify-center p-1 text-xs rounded-full size-4 -top-2 -right-2"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-primary"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart
                className={`size-5 md:size-4 xl:size-5 ${
                  isActive("/cart") && "text-primary"
                }`}
              />
              {isLoggedIn && cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute flex items-center justify-center p-0 text-xs rounded-full -top-2 -right-2 size-4"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex md:items-center md:justify-center hover:text-primary"
                onClick={() => router.push("/profile")}
              >
                <CircleUser
                  className={` size-5 md:size-4 xl:size-5 ${
                    isActive("/profile") && "text-primary"
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
              className="hidden md:flex hover:text-primary relative"
            >
              <Bell className="size-5 md:size-4 xl:size-5" />
              <div className="bg-primary text-white rounded-full text-[9px] absolute -top-1 -right-1 px-1.5 py-0.5">
                {notifications?.length || 0}
              </div>
            </Button>

            {/* Mobile menu */}
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
        {/* Mega Menu */}
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute left-120 z-50 pt-5 transition-all ease-in-out "
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="flex overflow-hidden bg-none rounded-lg gap-5 border">
              <div className="w-[280px] h-fit max-h-[450px] bg-white  rounded-lg overflow-y-auto border-r border-border">
                <div className="p-2">
                  <Link
                    href="/shop#shop"
                    className="flex items-center justify-between px-4 py-3 mb-1 text-sm transition-all duration-200 rounded-md hover:bg-secondary hover:text-primary group"
                    onClick={() => {
                      dispatch(resetFilters());
                      setIsDropdownVisible(false);
                    }}
                  >
                    <span className="font-medium font-poppins ">
                      ALL PRODUCTS
                    </span>
                  </Link>

                  <div className="space-y-1">
                    {dropdownCategoryData?.map((category) => (
                      <div
                        key={category.id}
                        id={`category-${category.id}`}
                        className={`flex items-center justify-between px-4 py-3 text-sm transition-all duration-200 rounded-md cursor-pointer group ${
                          hoveredCategory?.id === category.id
                            ? "bg-secondary text-primary"
                            : "hover:bg-secondary/50"
                        }`}
                        onClick={() => {
                          dispatch(resetFilters());
                          dispatch(
                            toggleCategory({ id: category.id, checked: true })
                          );
                          router.push("/shop#shop");
                        }}
                        onMouseEnter={(e) => {
                          setHoveredCategory(category);
                          setCategoryPosition(e.currentTarget.offsetTop);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium font-poppins ">
                            {category.name}
                          </span>
                        </div>
                        {category.subcategories.length > 0 && (
                          <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {hoveredCategory && hoveredCategory.subcategories.length > 0 && (
                <div
                  className="w-[320px] h-fit overflow-y-auto bg-muted/30 scrollbar-hide bg-white rounded-lg border-1 absolute left-[280px] transition-all duration-200"
                  style={{ top: `${categoryPosition}px` }}
                >
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
                      {hoveredCategory.name}
                    </h3>
                    <div className="space-y-1">
                      {hoveredCategory.subcategories.map((subcategory) => (
                        <span
                          key={subcategory.id}
                          className="block px-3 py-2.5 text-sm rounded-md transition-all duration-200 hover:bg-white group cursor-pointer"
                          onClick={() =>
                            handleCategoryCardClick(
                              hoveredCategory.id,
                              parseInt(subcategory.id)
                            )
                          }
                        >
                          <div className="flex items-center justify-between">
                            <span className=" group-hover:text-primary">
                              {subcategory.name}
                            </span>
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {isBrandDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 z-50 pt-5 transition-all ease-in-out dropdown-outer top-18 duration-800"
            onMouseEnter={handleBrandDropdownEnter}
            onMouseLeave={handleBrandDropdownLeave}
          >
            <div className="h-full overflow-hidden bg-white shadow-xl shadow-bottom rounded-lg border border-border">
              <div className="border-t border-border p-4">
                <div className="grid grid-cols-5 gap-4 auto-rows-[90px] overflow-y-auto max-h-[450px] scrollbar-hide">
                  {brandDropdownData?.map((brand) => (
                    <button
                      key={brand.id}
                      className="flex flex-col items-center justify-center gap-2 p-2  rounded-md border
                        transition-all duration-200 cursor-pointer  hover:shadow-lg hover:border-primary"
                      onClick={() => handleBrandCardClick(brand.id)}
                    >
                      <div className="w-40 h-20 flex items-center justify-center">
                        {brand.image ? (
                          <Image
                            src={brand.image}
                            width={56}
                            height={56}
                            alt={brand.name}
                            className="object-contain w-full h-full "
                          />
                        ) : (
                          <span className="w-14 h-14 flex items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg font-semibold text-gray-700 uppercase">
                            {brand.name?.charAt(0) || "?"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium font-poppins text-gray-700 text-center truncate w-full">
                        {brand.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {pathname === "/" && (
        <div className="bg-white relative h-[8vh] py-2 lg:hidden padding-x">
          <div className="absolute z-50 transform -translate-x-1/2 left-1/2 top-2 min-w-[250px] sm:min-w-[400px]">
            <SearchModal onClose={() => setSearchOpen(!searchOpen)} />
          </div>
        </div>
      )}
    </header>
  );
}
