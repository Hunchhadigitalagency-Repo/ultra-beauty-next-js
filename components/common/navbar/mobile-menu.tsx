"use client";
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
import { useState } from "react";
import LogoutModal from "../modals/logout-modal";
import { useAppSelector } from "@/redux/hooks"; // Import useAppSelector

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isLoggedIn } = useAppSelector( // Get isLoggedIn state
    (state) => state.authentication
  );

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutModal(true);
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5 text-pink-600" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="p-6 w-80 bg-white shadow-xl border-l border-pink-200"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-pink-600">
            Menu
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Navigate through our website
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col mt-4 space-y-3">
          <div className="pt-4 ">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
              onClick={() => setIsOpen(false)}
            >``
              Shop
            </Link>
            <Link
              href="/blogs"
              className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/help"
                  className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Help and Support
                </Link>
                <button
                  className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 w-full text-left transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
                <Link
                  href="/help"
                  className="block rounded-lg px-3 py-2 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Help and Support
                </Link>
              </>
            )}
          </div>
        </nav>
      </SheetContent>

      {isLoggedIn && showLogoutModal && (
        <LogoutModal
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
        />
      )}
    </Sheet>
  );
};

export default MobileMenu;