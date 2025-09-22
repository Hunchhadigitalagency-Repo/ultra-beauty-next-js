"use client";

// import StatsCard from "@/components/common/cards/stats-card";
// import {
//   userManagementIcons,
//   userManagementTitles,
// } from "@/constants/analytics-data";
// import useFetchData from "@/hooks/use-fetch-data";
// import { CardStats } from "@/types/dashboard";
// import { UserAnalyticsResponse } from "@/types/user-management";
// import React, { useMemo } from "react";

const UserManagementCards = () => {
  // const { data } = useFetchData<UserAnalyticsResponse>("/user-analytics/");

  // const stats = useMemo<CardStats[]>(() => {
  //   if (!data) return [];
  //   return Object.entries(data).map(([key, value]) => ({
  //     key,
  //     value: value.count,
  //     percentage: parseInt(value.change.replace("%", "")) || 0,
  //     indicator: value.change.startsWith("+")
  //       ? "up"
  //       : value.change.startsWith("-")
  //       ? "down"
  //       : "steady",
  //   }));
  // }, [data]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* {stats.map(({ key, value, percentage, indicator }) => {
        const Icon = userManagementIcons[key];
        const title = userManagementTitles[key];

        return (
          <StatsCard
            key={key}
            Icon={Icon}
            title={title}
            value={value.toString()}
            percentage={percentage}
            indicator={indicator}
            className="border border-[#E7E6E6]"
          />
        );
      })} */}
    </section>
  );
};

export default UserManagementCards;
