"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { useState, useRef } from "react";
import SearchModal from "./search-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from 'lucide-react';
import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
  // ChevronDown,
} from "lucide-react";

import NotificationModal from "./notification-modal";
import { useAppSelector } from "@/redux/hooks";
// import useFetchData from "@/hooks/use-fetch";
// import { ICategoryDropdown } from "@/types/dropdown";
import MegaMenu from "./mega-menu";

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

  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const path = usePathname();


  const isActive = (pathname: string) => path === pathname;
  // const isActiveHeader = (pathname: string) => path.startsWith(pathname);




  const { isLoggedIn } = useAppSelector((state) => state.authentication);
  const { wishlistCount } = useAppSelector((state) => state.navbar);
  // const { data } = useFetchData<ICategoryDropdown[]>(`dropdown/category/`);

  const handleCategoryEnter = (id: number) => {
    setIsDropdownVisible(true);
    setActiveCategory(id);
    setActiveMegaMenu(true);
  };

  const handleSubCategoryLeave = () => {
    setIsDropdownVisible(false);
    setActiveMegaMenu(false);
    setActiveCategory(null);
  }


  const handleCategoryClick = (id: number) => {
    console.log(id)
    // dispatch(toggleCategory({ id, checked: true }))
    router.push('/shop');
  }

  const selectedCategory = data?.find(item => item.id === activeCategory);

  const subCategoriesData = selectedCategory?.subcategories || [];
  return (
    <>
      <header className="relative bg-secondary border-b border-gray-200 sticky top-0 z-50">
        <div className="padding-x py-2">
          {/* Search Popup */}
          {searchOpen && <SearchModal />}
          {/* Mega Menu */}
          {activeMegaMenu && <MegaMenu onMouseLeave={handleSubCategoryLeave} dropdownProducts={subCategoriesData} />}

          {/* Notification */}
          {showNotification && (
            <NotificationModal onClose={() => setShowNotification(false)} />
          )}

          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-base whitespace-nowrap md:text-xl text-center font-playfair font-medium text-primary leading-none">
                Ultra Beauty
                <br />
                <span className="font-poppins text-sm md:text-base">&</span>
                <br />
                Brand
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="w-full lg:flex justify-center items-center space-x-8" ref={navRef}>
              <div className="flex justify-center items-center">
                <div className="static-nav flex gap-8">
                  <p className="nav-link"><Link href="/">Home</Link></p>
                  <p className="nav-link pr-7"><Link href="/shop">GlowShop</Link></p>
                </div>

                {/* navbar for fetched cateogries */}
                <div className="max-w-[600px]">
                  {
                    data?.length < 5 ? (
                      <div className="flex gap-8">
                        {data?.slice(0, 4).map((category) => (
                          <button
                            key={category.id}
                            className="flex items-center w-auto gap-1 text-white cursor-pointer font-poppins whitespace-nowrap"
                            onMouseEnter={() => handleCategoryEnter(category.id)}
                            // onMouseLeave={handleCategoryLeave}
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
                            className="flex items-center w-auto gap-1 text-black cursor-pointer font-poppins whitespace-nowrap"
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
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="hover:text-primary"
              >
                <Search className={`size-5 ${searchOpen && "text-primary"}`} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-secondary"
                onClick={() => router.push("/wishlist")}
              >
                <Heart className={`size-5 ${isActive("/wishlist") && "text-secondary"}`} />
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
                  className={`size-5 ${isActive("/cart") && "text-primary"}`}
                />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 size-4 rounded-full p-0 flex items-center justify-center text-xs"
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
                    className={`size-5 ${isActive("/profile") && "text-primary"
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
                <Bell className="size-5" />
              </Button>

              {/* Mobile menu */}
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div >
      </header >
    </>
  );
}
