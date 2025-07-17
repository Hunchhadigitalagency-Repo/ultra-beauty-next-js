"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export default function AnnouncementBar() {
  const { isLoggedIn, profileDetails } = useAppSelector(
    (state) => state.authentication
  );

  return (
    <div className="bg-[#FAFAFA] text-black w-full px-8 padding-x h-12 flex items-center justify-between">
      <div className="flex-1 flex items-center justify-between text-sm">
        <div className="flex-1 text-center text-foreground lg:text-left text-sm">
          <span>
            20% Off on New Brand Earth Mama! Shop Now
          </span>
        </div>
        {isLoggedIn ? (
          <div className="hidden lg:flex items-center space-x-4">
            <h6 className="text-sm font-medium text-white">
              Hello!{" "}
              {profileDetails.first_name + " " + profileDetails.last_name}
            </h6>

            <Link href="/help" className="hover:underline text-sm">
              Help and Support
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/login" className="hover:underline text-sm">
              Login
            </Link>
            <Link href="/signup" className="hover:underline text-sm">
              Signup
            </Link>
            <Link href="/help" className="hover:underline text-sm">
              Help and Support
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
