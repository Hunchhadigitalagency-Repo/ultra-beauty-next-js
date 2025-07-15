"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getNavigationItems } from "../../../constants/navbar-data";

interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  children?: {
    name: string;
    href: string;
  }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {

    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const fetchNavigationItems = async () => {
      const data = await getNavigationItems();
      setNavigationItems(data);
    };
    fetchNavigationItems();
  }, []);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through our website</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between">
                {item.name}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </div>
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Link
              href="/login"
              className="block text-blue-600 hover:text-blue-800"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block text-blue-600 hover:text-blue-800"
            >
              Signup
            </Link>
            <Link
              href="/help"
              className="block text-blue-600 hover:text-blue-800"
            >
              Help and Support
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
