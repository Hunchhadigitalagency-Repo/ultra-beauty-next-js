"use client";

import type React from "react";
import Navbar from "@/components/common/navbar/navbar";
import Footer from "@/components/common/footer/footer";
import MobileFootbar from "@/components/mobile/MobileFootbar";
// import MobileFilterMenu from "@/components/mobile/MobileFilterMenu";
import AnnouncementBar from "@/components/common/navbar/announcement-bar";
import useTrackVisit from "@/hooks/use-track-visit";
import { usePathname } from "next/navigation";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  useTrackVisit();
  const pathname = usePathname();

  if (pathname.includes("mobile")) {
    return <div className="">{children}</div>;
  }
  return (
    <div className="bg-white">
      <AnnouncementBar />
      <Navbar />
      {/* <MobileFilterMenu /> */}
      {children}
      <MobileFootbar />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
