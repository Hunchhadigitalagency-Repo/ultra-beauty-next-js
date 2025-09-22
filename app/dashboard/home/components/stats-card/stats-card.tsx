"use client";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { ElementType } from "react";

interface IStatsCard {
  Icon: ElementType;
  title: string;
  value: string;
  percentage?: number;
  indicator?: string;
  className?: string;
}

const StatsCard = ({
  Icon,
  title,
  value,
  percentage,
  indicator,
  className,
}: IStatsCard) => {
  const indicatorColor =
    indicator === "growing"
      ? "text-green"
      : indicator === "decreasing"
        ? "text-red"
        : "text-orange-500";

  const indicatorLabel =
    indicator === "growing"
      ? "Increased"
      : indicator === "decreasing"
        ? "Decreased"
        : "No Change";

  return (
    <section
      className={`flex flex-col gap-4 p-4 bg-white rounded-lg shadow-xs ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center rounded-[3px] bg-primary text-white">
          <Icon />
        </div>
        <h4 className="text-base text-muted-foreground font-medium">{title}</h4>
      </div>

      <h2 className="text-foreground text-2xl font-semibold">{value}</h2>

      {
        percentage &&
        <div className="flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1 ${indicatorColor}`}>
            {percentage}%
            {indicatorLabel === "Increased" ? (
              <ArrowUp className="size-4" />
            ) : indicatorLabel === "Decreased" ? (
              <ArrowDown className="size-4" />
            ) : null}
          </div>

          <p className="text-accent-foreground">
            {indicatorLabel} than yesterday
          </p>
        </div>
      }
    </section>
  );
};

export default StatsCard;
