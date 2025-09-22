"use client";

import StatsCard from "@/components/common/cards/stats-card";
import { userStatsIcons, userStatsTitles } from "@/constants/analytics-data";
import React from "react";

const UserStatsCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.keys(userStatsIcons).map((key) => {
        const Icon = userStatsIcons[key];
        const title = userStatsTitles[key];

        return (
          <StatsCard
            key={key}
            Icon={Icon}
            title={title}
            value="100"
            percentage={100}
            indicator=""
          />
        );
      })}
    </section>
  );
};

export default UserStatsCards;
