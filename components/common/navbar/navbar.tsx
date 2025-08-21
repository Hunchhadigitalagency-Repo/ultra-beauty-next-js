"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { useState } from "react";
import SearchModal from "./search-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Bell,
  Heart,
  CircleUser,
  // ChevronDown,
} from "lucide-react";
// import MegaMenu from "./mega-menu";
import NotificationModal from "./notification-modal";
import { useAppSelector } from "@/redux/hooks";
import useFetchData from "@/hooks/use-fetch";
import { ICategoryDropdown } from "@/types/dropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();
  const path = usePathname();


  const isActive = (pathname: string) => path === pathname;
  // const isActiveHeader = (pathname: string) => path.startsWith(pathname);

  // const handleCategoryClick = (navItem: string, value: boolean) => {
  //   if (navItem === "Shop by Category") {
  //     setActiveMegaMenu(value);
  //   }
  // };

  const { isLoggedIn } = useAppSelector((state) => state.authentication);
  const { data } = useFetchData<ICategoryDropdown[]>(`dropdown/category/`);


  return (
    <>
      <header className="bg-secondary border-b border-gray-200 sticky top-0 z-50">
        <div className="padding-x py-2 relative">
          {/* Search Popup */}
          {searchOpen && <SearchModal />}
          {/* Mega Menu */}
          {/* {activeMegaMenu && <MegaMenu />} */}

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
            <nav className="w-full lg:flex justify-center items-center space-x-8">
              <ul className="flex justify-center items-center">
                <div className="static-nav flex gap-8">
                  <li className="nav-link"><Link href="/">Home</Link></li>
                  <li className="nav-link pr-7"><Link href="/shop">GlowShop</Link></li>
                </div>
                {
                  data?.length && data?.length < 5 ? (
                    data?.slice(0, 4).map((category) => (
                      <div key={category.id} >
                        <li className="nav-link px-4">
                          <Link href="">{category.name}</Link>
                          <Link href="">{category.name}</Link>
                        </li>
                      </div>

                    ))
                  ) : (
                    <div className="max-w-[600px] overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                      <ul className="flex gap-8 px-4">
                        {data?.map((category) => (
                          <li key={category.id} className="shrink-0 snap-start">
                            <Link href="" className="nav-link ">
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                }
              </ul>

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
                className="relative hover:text-primary"
                onClick={() => router.push("/wishlist")}
              >
                <Heart
                  className={`size-5 ${isActive("/wishlist") && "text-primary"
                    }`}
                />
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 size-4 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  1
                </Badge>
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
        </div>
      </header>
    </>
  );
}
