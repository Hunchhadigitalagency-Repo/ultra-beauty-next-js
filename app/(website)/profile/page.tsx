"use client";

import React, { useState } from "react";
import { PROFILE_TABS } from "./components/profile-tabs";
import SectionHeader from "@/components/common/header/section-header";

const Profile: React.FunctionComponent = () => {

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <main className="padding flex flex-col gap-5 lg:gap-10">
      <SectionHeader title="Profile" description="See Profile Details" />
      <section className="flex flex-col lg:flex-row gap-12">
        <aside className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2 lg:bg-secondary lg:p-5 rounded-lg min-w-60 h-fit">
          {PROFILE_TABS.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`flex items-center justify-center lg:justify-start rounded-md not-only:bg-secondary px-5 py-2 font-medium text-sm md:text-base cursor-pointer ${index === activeTabIndex && "text-primary"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </aside>
        <div className="flex-1">{PROFILE_TABS[activeTabIndex].component}</div>
      </section>
    </main>
  );
};

export default Profile;
