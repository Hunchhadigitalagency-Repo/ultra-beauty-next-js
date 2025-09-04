"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-4 w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through our website</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col mt-8 space-y-4">
          <div className="pt-4 space-y-2">
            <Link
              href="/"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/login"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
            <Link
              href="/help"
              className="block text-blue-600 hover:text-blue-800"
              onClick={() => setIsOpen(false)}
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
