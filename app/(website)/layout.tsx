"use client";

import type React from "react";
import Navbar from "@/components/common/navbar/navbar";
import Footer from "@/components/common/footer/footer";
import MobileFootbar from "@/components/mobile/MobileFootbar";
// import MobileFilterMenu from "@/components/mobile/MobileFilterMenu";
import AnnouncementBar from "@/components/common/navbar/announcement-bar";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {

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
