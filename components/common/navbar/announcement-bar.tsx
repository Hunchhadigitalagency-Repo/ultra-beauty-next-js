"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import LogoutModal from "../modals/logout-modal";
import { useRouter } from "next/navigation";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import useFetchData from "@/hooks/use-fetch";
import { INavigationInfo } from "@/types/navigation-info";


export const dummy = [
  {
    "id": 47,
    "title": "Get Flash sales and off on early birds 10% discount ",
    "product": {
      "name": "Pregnancy Pillow",
      "slug_name": "pregnancysku"
    },
    "is_active": true
  },
  // {
  //   "id": 47,
  //   "title": "Get Flash sales and off on early birds 10% discount 22222222222222222",
  //   "product": {
  //     "name": "Pregnancy Pillow",
  //     "slug_name": "pregnancysku"
  //   },
  //   "is_active": true
  // },
  // {
  //   "id": 47,
  //   "title": "Get Flash sales and off on early birds 10% discount 333333333333333333333333",
  //   "product": {
  //     "name": "Pregnancy Pillow",
  //     "slug_name": "pregnancysku"
  //   },
  //   "is_active": true
  // },
]


export default function AnnouncementBar() {
  const { isLoggedIn, profileDetails } = useAppSelector(
    (state) => state.authentication
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { data } = useFetchData<INavigationInfo[]>('/cms/navigation-infos-dropdown/')
  console.log('this is that data', data);

  const router = useRouter()

  return (
    <div className="bg-[#FAFAFA] text-black w-full px-8 padding-x h-12 flex items-center justify-between">
      <div className="flex items-center justify-between flex-1 text-sm">
        <div className="flex items-center justify-center flex-1 text-sm lg:justify-between">
          <div className="relative max-w-[300px] h-full flex items-center overflow-hidden group">
            <Marquee>
              <MarqueeContent pauseOnHover={true}>
                {data && data?.map((info, index) => (
                  <MarqueeItem key={index} className="inline-flex mr-20 cursor-pointer" onClick={() => router.push(`/shop/${1}`)}>
                    <span className="whitespace-nowrap text-black">{info.title}</span>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>

          </div>
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
