import { ArrowDown, ArrowUp,  } from "lucide-react";
import React, { ElementType } from "react";

interface IStatsCard {
  Icon: ElementType;
  title: string;
  value: string;
  percentage: number;
}

const StatsCard = ({ Icon, title, value, percentage }: IStatsCard) => {
  return (
    <section className="flex flex-col  gap-4 p-4 bg-white rounded-lg shadow-xs">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center rounded-sm bg-primary text-white">
          <Icon />
        </div>

        <h4 className="text-base text-muted-foreground font-medium">{title}</h4>
      </div>

      <h2 className="text-foreground text-2xl font-semibold">{value}</h2>

      <div className="flex items-center gap-2">
        <div className="text-xs flex items-center gap-2">
          {percentage}%{" "}
          {percentage > 0 ? (
            <ArrowUp className="text-green size-4" />
          ) : (
            <ArrowDown className="text-red size-4" />
          )}{" "}
        </div>

        <p className="text-accent-foreground text-xs">Than Yesterday</p>
      </div>
    </section>
  );
};

export default StatsCard;
