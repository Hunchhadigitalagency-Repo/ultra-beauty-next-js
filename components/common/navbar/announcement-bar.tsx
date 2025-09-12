"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import LogoutModal from "../modals/logout-modal";

export default function AnnouncementBar() {
  const { isLoggedIn, profileDetails } = useAppSelector(
    (state) => state.authentication
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="bg-[#FAFAFA] text-black w-full px-8 padding-x h-12 flex items-center justify-between">
      <div className="flex items-center justify-between flex-1 text-sm">
        <div className="relative overflow-hidden max-w-[300px] h-full flex justify-center items-center">
          <span className="text-sm font-normal text-black slide-text">
            20% Off on New Brand Earth Mama! Shop Now
          </span>
        </div>
        {isLoggedIn ? (
          <div className="items-center hidden space-x-4 lg:flex">
            <h6 className="text-sm text-black">
              Hello!
              {" " + profileDetails.first_name + " " + profileDetails.last_name}
            </h6>

            <Link href="/help" className="text-sm hover:underline">
              Help and Support
            </Link>

            <p
              onClick={() => setShowLogoutModal(true)}
              className="text-sm text-black cursor-pointer hover:underline"
            >
              Logout
            </p>

            {showLogoutModal &&
              <LogoutModal
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
              />}
          </div>
        ) : (
          <div className="items-center hidden space-x-4 lg:flex">
            <Link href="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link href="/signup" className="text-sm hover:underline">
              Signup
            </Link>
            <Link href="/help" className="text-sm hover:underline">
              Help and Support
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
