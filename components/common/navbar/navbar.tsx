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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchNavigationItems = async () => {
      const data = await getNavigationItems();
      console.log(data);
      setNavigationItems(data);
    };
    fetchNavigationItems();
  }, []);

  const isActive = (pathname: string) => path === pathname;
  const isActiveHeader = (pathname: string) => path.startsWith(pathname);

  const handleMouseEnter = (itemName: string, hasDropdown: boolean) => {
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    if (hasDropdown) {
      setActiveMegaMenu(itemName);
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
    setMegaMenuTimeout(timeout);
  };

  const handleMegaMenuMouseEnter = () => {
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  const renderMegaMenu = (item: NavigationItem) => {
    // console
    if (!item.children || item.children.length === 0) return null;

    return (
      <div
        className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-xl z-40 opacity-0 translate-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
        style={{ opacity: 1, transform: 'translateY(0)' }}
        onMouseEnter={handleMegaMenuMouseEnter}
        onMouseLeave={handleMegaMenuMouseLeave}
      >
        <div className="padding-x py-8">
          <div className="max-w-7xl mx-auto">
            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
              {item.children.map((child) => (
                <Link
                  key={child.name}
                  href={child.href}
                  className="group p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-gray-50/50 transition-all duration-200 hover:shadow-md"
                  onClick={() => setActiveMegaMenu(null)}
                >
                  <div className="flex flex-col items-center text-center space-y-3">

                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 text-sm">
                        {child.name}
                      </h3>

                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Featured Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-xl border border-primary/10 hover:border-primary/20 transition-all duration-200 group cursor-pointer">
                  <div className="flex items-start space-x-4">

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Featured Products</h4>
                      <p className="text-xs text-gray-600 mb-3">Discover our latest collection</p>
                      <Link
                        href="/shop/"
                        className="text-primary font-medium text-xs hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        Shop Now →
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 via-emerald-25 to-transparent p-6 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all duration-200 group cursor-pointer">
                  <div className="flex items-start space-x-4">

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Best Sellers</h4>
                      <p className="text-xs text-gray-600 mb-3">Most popular items this month</p>
                      <Link
                        href="/shop/"
                        className="text-emerald-600 font-medium text-xs hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 via-orange-25 to-transparent p-6 rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-200 group cursor-pointer">
                  <div className="flex items-start space-x-4">

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Sale Items</h4>
                      <p className="text-xs text-gray-600 mb-3">Up to 50% off selected items</p>
                      <Link
                        href="/shop/"
                        className="text-orange-600 font-medium text-xs hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        Shop Sale →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="bg-secondary border-b border-gray-200 sticky top-0 z-50">
        <div className="padding-x py-2 relative">
          {/* Search Popup */}
          {searchOpen && <SearchModal />}

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
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name, item.hasDropdown || false)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <button
                      className={`flex items-center space-x-1 text-foreground hover:text-primary transition-colors text-sm py-2 ${isActiveHeader(item.href)
                          ? "text-primary font-medium"
                          : "text-foreground font-normal"
                        }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeMegaMenu === item.name ? 'rotate-180' : ''
                          }`}
                      />
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

              <Button variant="ghost" size="icon" className="hidden md:flex hover:text-primary">
                <Bell className="size-5" />
              </Button>

              {/* Mobile menu */}
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu Overlay */}
      {activeMegaMenu && (
        <div className="relative">
          {navigationItems
            .filter((item) => item.name === activeMegaMenu && item.hasDropdown)
            .map((item) => renderMegaMenu(item))}
        </div>
      )}
    </>
  );
}