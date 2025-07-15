"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { getNavigationItems } from "@/constants/navbar-data";

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

export default function MobileFilterMenu() {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getNavigationItems();
      setNavigationItems(items);
    };
    fetchItems();
  }, []);

  return (
    <div className="md:hidden px-4 py-2 bg-white shadow-sm border-b  flex justify-around">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-x-4 justify-around list-none p-0 m-0">
          {navigationItems
            .filter(
              (item) =>
                item.name === "Shop by Category" ||
                item.name === "Best Seller" ||
                item.name === "Sale"
            )
            .map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.hasDropdown && item.children ? (
                  <>
                    <NavigationMenuTrigger className="text-sm px-3 py-2 rounded-md bg-blue-500 text-white h-[30px]">
                      {item.name}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="min-w-[100px] max-h-100 overflow-y-auto p-2 bg-white shadow-md rounded-md">
                      {item.children.map((child) => (
                        <NavigationMenuLink asChild key={child.name}>
                          <Link
                            href={child.href}
                            className="block px-3 py-1 text-sm text-foreground hover:bg-gray-100 rounded"
                          >
                            {child.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm px-2 py-1 rounded-md block h-[30px] ${item.name === "Shop by Category"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
