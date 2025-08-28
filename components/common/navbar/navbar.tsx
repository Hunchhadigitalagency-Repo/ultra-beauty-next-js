"use client";

import Link from "next/link";
import { useState } from "react";
import MegaMenu from "./mega-menu";
import SearchModal from "./search-modal";
import { ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import NotificationModal from "./notification-modal";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
  // ChevronDown,
} from "lucide-react";
import MobileMenu from "./mobile-menu";

// import useFetchData from "@/hooks/use-fetch";
// import { ICategoryDropdown } from "@/types/dropdown";

export default function Navbar() {
  const data = [
    {
      id: 1,
      name: "Electronics",
      subcategories: [
        { id: 101, name: "iPhone 15 Pro" },
        { id: 102, name: "Samsung Galaxy S23 Ultra" },
        { id: 103, name: "MacBook Air M2" },
        { id: 104, name: "Dell XPS 13" },
        { id: 105, name: "Sony Alpha A7 III" },
        { id: 106, name: "Canon EOS R5" },
        { id: 107, name: "Bose QuietComfort 45 Headphones" },
        { id: 108, name: "Apple AirPods Pro 2" },
        { id: 109, name: "Samsung 55\" QLED TV" },
        { id: 110, name: "LG OLED C2 65\"" },
        { id: 111, name: "Apple iPad Pro 12.9" },
        { id: 112, name: "Amazon Kindle Paperwhite" },
        { id: 113, name: "GoPro Hero 11" },
        { id: 114, name: "Sony PlayStation 5" },
        { id: 115, name: "Microsoft Xbox Series X" },
      ],
    },
    {
      id: 2,
      name: "Fashion",
      subcategories: [
        { id: 201, name: "Levi's 501 Jeans" },
        { id: 202, name: "Nike Air Force 1" },
      ],
    },
    {
      id: 3,
      name: "Home & Kitchen",
      subcategories: [
        { id: 301, name: "IKEA Dining Table" },
        { id: 302, name: "Prestige Pressure Cooker" },
        { id: 303, name: "Philips Air Fryer" },
        { id: 304, name: "NutriBullet Blender" },
      ],
    },
    {
      id: 4,
      name: "Books",
      subcategories: [
        { id: 401, name: "Harry Potter and the Sorcerer’s Stone" },
        { id: 402, name: "Atomic Habits" },
        { id: 403, name: "The Alchemist" },
      ],
    },
    {
      id: 5,
      name: "Sports & Outdoors",
      subcategories: [
        { id: 501, name: "Yonex Badminton Racket" },
        { id: 502, name: "Coleman Camping Tent" },
      ],
    },
    {
      id: 6,
      name: "Beauty & Personal Care",
      subcategories: [
        { id: 601, name: "L'Oreal Shampoo" },
        { id: 602, name: "Maybelline Lipstick" },
        { id: 603, name: "Neutrogena Face Wash" },
      ],
    },
    {
      id: 7,
      name: "Toys & Games",
      subcategories: [
        { id: 701, name: "Lego Star Wars Set" },
        { id: 702, name: "Monopoly Classic" },
        { id: 703, name: "Barbie Dreamhouse" },
      ],
    },
    {
      id: 8,
      name: "Automotive",
      subcategories: [
        { id: 801, name: "Bosch Car Wipers" },
        { id: 802, name: "Castrol Engine Oil" },
      ],
    },
    {
      id: 9,
      name: "Health & Wellness",
      subcategories: [
        { id: 901, name: "GNC Multivitamins" },
        { id: 902, name: "Omron Blood Pressure Monitor" },
        { id: 903, name: "Yoga Mat Pro" },
      ],
    },
    {
      id: 10,
      name: "Music & Instruments",
      subcategories: [
        { id: 1001, name: "Fender Stratocaster Guitar" },
        { id: 1002, name: "Yamaha PSR Keyboard" },
        { id: 1003, name: "Roland Electronic Drum Kit" },
        { id: 1004, name: "Yamaha Alto Saxophone" },
      ],
    },
    {
      id: 11,
      name: "Test",
      subcategories: [],
    }
  ];

  const [searchOpen, setSearchOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false)


  const router = useRouter();
  const path = usePathname();
  const isActive = (pathname: string) => path === pathname;
  const { isLoggedIn } = useAppSelector((state) => state.authentication);
  const { wishlistCount } = useAppSelector((state) => state.navbar);
  // const { data } = useFetchData<ICategoryDropdown[]>(`dropdown/category/`);

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
                {
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
                  className="absolute flex items-center justify-center w-5 h-5 p-1 text-xs rounded-full -top-2 -right-2"
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
              <Badge
                variant="destructive"
                className="absolute flex items-center justify-center p-0 text-xs rounded-full -top-2 -right-2 size-4"
              >
                1
              </Badge>
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
