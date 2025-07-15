"use client";

import type React from "react";
import Footer from "@/components/common/footer/footer";
import AnnouncementBar from "@/components/common/navbar/announcement-bar";
import Navbar from "@/components/common/navbar/navbar";
import Newsletter from "@/components/common/newsletter/newsletter";
import MobileFootbar from "@/components/mobile/MobileFootbar";
import MobileFilterMenu from "@/components/mobile/MobileFilterMenu";

const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <AnnouncementBar />
      <Navbar />
      <MobileFilterMenu />
      {children} <Newsletter /> <MobileFootbar /> <Footer />
    </div>
  );
};

export default WebsiteLayout;
