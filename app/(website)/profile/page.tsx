"use client";

import { Menu } from 'lucide-react';
import React, { useState } from "react";
import { PROFILE_TABS } from "./components/profile-tabs";
import SectionHeader from "@/components/common/header/section-header";
import ProfileMenu from "@/components/common/navbar/profile-mobile-menu";

const Profile: React.FunctionComponent = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleProfileHamburgerClick = () => {
    setIsOpen(true);
  }

  return (
    <main className="flex flex-col gap-5 padding lg:gap-10">
      <section className="flex justify-between">
        <SectionHeader
          title="Profile"
          description="See Profile Details"
        />
        <div className="relative mobile-menu lg:hidden">
          <Menu onClick={handleProfileHamburgerClick} />
          {/* Profile Mobile Menu */}
          <div className="absolute right-0 z-50 rounded top-2 bg-secondary lg:hidden">
            {
              isOpen &&
              <ProfileMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
              />
            }
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-12 lg:flex-row">
        <aside className="grid grid-cols-2 gap-2 rounded-lg sm:grid-cols-4 lg:block lg:grid-cols-1 lg:bg-secondary lg:p-5 min-w-60 h-fit">
          {
            PROFILE_TABS.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={`flex items-center justify-center gap-4 whitespace-nowrap lg:justify-start rounded-md not-only:bg-secondary px-5 py-2 font-medium text-sm md:text-base cursor-pointer ${index === activeTabIndex && "text-primary"
                  }`}
              >
                <span className={`p-1 hidden lg:block rounded-sm ${index === activeTabIndex && 'bg-primary'}`}>
                  <tab.icon className={`w-4 h-4 ${index === activeTabIndex && 'text-white'}`} />
                </span>
                {tab.name}
              </button>
            ))
          }
        </aside>
        <div className="flex-1">
          {PROFILE_TABS[activeTabIndex].component}
        </div>
      </section>
    </main>
  );
};

export default Profile;
