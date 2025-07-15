"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Bell, Heart, CircleUser } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./mobile-menu";
// import { getNavigationItems } from "./constants/navbar-data";
import { getNavigationItems } from "../../../constants/navbar-data";

// ✅ Define the type
interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  children?: {
    name: string;
    href: string;
  }[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="padding-x py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-green">बSERA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger
                          className={`text-foreground hover:text-primary bg-transparent font-medium  ${isActiveHeader(item.href)
                              ? "text-primary font-semibold"
                              : "text-foreground"
                            }`}
                        >
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px] max-h-120 overflow-y-auto p-2 bg-white shadow-md rounded-md">
                          {item.children?.map((child) => (
                            <NavigationMenuLink asChild key={child.name}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2 text-sm text-foreground rounded transition-colors "
                              >
                                {child.name}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-foreground hover:text-primary font-medium transition-colors text-sm  ${isActive(item.href)
                        ? "text-primary font-semibold"
                        : "text-foreground"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="size-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative hover:text-yellow"
              onClick={() => router.push("/wishlist")}
            >
              <Heart
                className={`size-5 ${isActive("/wishlist") && "text-yellow"}`}
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
              className="relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart
                className={`size-5 ${isActive("/cart") && "text-yellow"} `}
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
              className="relative"
              onClick={() => router.push("/profile")}
            >
              <CircleUser
                className={`size-5 ${isActive("/profile") && "text-yellow"} `}
              />
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className={`size-5`} />
            </Button>

            {/* Mobile menu */}
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}
