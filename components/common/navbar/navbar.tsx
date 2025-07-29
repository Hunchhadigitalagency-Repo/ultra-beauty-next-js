"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { useEffect, useState } from "react";
import SearchModal from "./search-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavigationItem } from "@/types/website";
import { usePathname, useRouter } from "next/navigation";
import { getNavigationItems } from "../../../constants/navbar-data";
import { Search, ShoppingCart, Bell, Heart, CircleUser, ChevronDown } from "lucide-react";
import MegaMenu from "./mega-menu";
import NotificationModal from "./notification-modal";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false)

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchNavigationItems = async () => {
      const data = await getNavigationItems();
      setNavigationItems(data);
    };
    fetchNavigationItems();
  }, []);

  const isActive = (pathname: string) => path === pathname;
  const isActiveHeader = (pathname: string) => path.startsWith(pathname);

  const handleCategoryClick = (navItem: string, value: boolean) => {
    if (navItem === "Shop by Category") {
      setActiveMegaMenu(value);
    }
  }


  return (
    <>
      <header className="bg-secondary border-b border-gray-200 sticky top-0 z-50">
        <div className="padding-x py-2 relative">
          {/* Search Popup */}
          {searchOpen && <SearchModal />}
          {/* Mega Menu */}
          {activeMegaMenu && <MegaMenu />}

          {/* Notification */}
          {showNotification && <NotificationModal onClose={() => setShowNotification(false)} />}

          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-base md:text-xl text-center font-playfair font-medium text-primary leading-none">
                Ultra Beauty<br />
                <span className="font-poppins text-sm md:text-base">&</span><br />
                Brand
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">

                  {item.hasDropdown ? (
                    <button onClick={() => handleCategoryClick(item.name, !activeMegaMenu)}
                      className={`flex items-center space-x-1 text-foreground hover:text-primary transition-colors text-sm py-2 ${isActiveHeader(item.href)
                        ? "text-primary font-medium"
                        : "text-foreground font-normal"
                        }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${item.name === "Shop by Category" && activeMegaMenu
                        ? "transform rotate-180 text-primary"
                        : ""
                        }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-foreground hover:text-primary transition-colors text-sm py-2 ${isActive(item.href)
                        ? "text-primary font-medium"
                        : "text-foreground font-normal"
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
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
                <Heart className={`size-5 ${isActive("/wishlist") && "text-primary"}`} />
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
                <ShoppingCart className={`size-5 ${isActive("/cart") && "text-primary"}`} />
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
                onClick={() => router.push("/profile")}
              >
                <CircleUser className={`size-5 ${isActive("/profile") && "text-primary"}`} />
              </Button>

              <Button
                onClick={() => setShowNotification(prev => !prev)}
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