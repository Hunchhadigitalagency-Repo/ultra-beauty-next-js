"use client";

import { statsIcons, statsTitles } from "@/constants/analytics-data";
import { useMemo } from "react";
import StatsCard from "@/components/common/cards/stats-card";
import { CardStats } from "@/types/dashboard";
import useFetchData from "@/hooks/use-fetch";

const StatsCardsSection = () => {
  const { data: rawData } = useFetchData<any[]>("/counts-cards/", true);

  console.log(rawData, "stat card from dashboard")
  const stats = useMemo<CardStats[]>(() => {
    if (!rawData) return [];
    return rawData.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = Number(obj[key]) || 0;
      return {
        key,
        value,
        percentage: Math.floor(obj.percent_change ?? 0),
        indicator: obj.indicator ?? "steady",
      };
    });
  }, [rawData]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ key, value, percentage, indicator }) => {
        const Icon = statsIcons[key];
        const title = statsTitles[key];

        return (
          <StatsCard
            key={key}
            Icon={Icon}
            title={title}
            value={value.toString()}
            percentage={percentage}
            indicator={indicator}
          />
        );
      })}
    </section>
  );
};

export default StatsCardsSection;
