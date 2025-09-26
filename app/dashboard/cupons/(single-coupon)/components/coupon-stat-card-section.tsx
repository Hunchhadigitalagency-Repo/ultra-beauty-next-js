"use client";

import React, { useMemo } from "react";
import StatsCard from "@/components/common/cards/stats-card";
import { Gift, DollarSign } from "lucide-react"; // static icons import

interface CouponStatsCardsSectionProps {
  totalCouponsUsed: number;
  totalDiscountGiven: number;
}

const CouponStatsCardsSection: React.FC<CouponStatsCardsSectionProps> = ({
  totalCouponsUsed,
  totalDiscountGiven,
}) => {
  // Prepare stats array
  const stats = useMemo(() => [
    {
      key: "totalCouponsUsed",
      value: totalCouponsUsed,
      title: "Total Coupons Used",
      Icon: Gift,
    },
    {
      key: "totalDiscountGiven",
      value: totalDiscountGiven,
      title: "Total Discount Given",
      Icon: DollarSign,
    },
  ], [totalCouponsUsed, totalDiscountGiven]);

  return (
    <section className="flex flex-col gap-4  md:gap-6">
      {stats.map(({ key, value, title, Icon }) => (
        <StatsCard
          key={key}
          Icon={Icon}
          title={title}
          value={value?.toString()}
        />
      ))}
    </section>
  );
};

export default CouponStatsCardsSection;
