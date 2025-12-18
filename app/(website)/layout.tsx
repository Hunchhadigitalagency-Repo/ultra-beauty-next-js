"use client";

import type React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/common/navbar/navbar";
import Footer from "@/components/common/footer/footer";
import MobileFootbar from "@/components/mobile/MobileFootbar";
import AnnouncementBar from "@/components/common/navbar/announcement-bar";
import useTrackVisit from "@/hooks/use-track-visit";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  useTrackVisit();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  if (pathname.includes("mobile")) {
    return <div>{children}</div>;
  }

  return (
    <div className="bg-white">
      <AnnouncementBar />
      <Navbar />
      {children}
      <MobileFootbar />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
