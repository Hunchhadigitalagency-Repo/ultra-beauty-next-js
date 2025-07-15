"use client"
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
  centerLabel?: string;
  centerValue?: number | string;
}

// Default colors if not provided in data
const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // purple
  "#ef4444", // red
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#f97316", // orange
  "#14b8a6", // teal
  "#6366f1", // indigo
];

export function DonutChart({
  data,
  innerRadius = 60,
  outerRadius = 80,
  className,
}: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_:unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 1}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Determine what to show in the center based on selection state
  const displayValue = activeIndex !== null ? data[activeIndex]?.value : total;
  const displayLabel = activeIndex !== null ? data[activeIndex]?.name : "Total";

  function formatNumber(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2).replace(/\.0$/, "") + "B";
    }
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2).replace(/\.0$/, "") + "M";
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(2).replace(/\.0$/, "") + "K";
    }
    return value.toString();
  }

  return (
    <div className={cn("relative h-[200px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex !== null ? activeIndex : undefined}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            paddingAngle={0}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
                strokeWidth={5}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-28 max-w-full break-words md:w-auto">
        <div className="text-xl font-bold">{formatNumber(displayValue)}</div>
        <div className="text-xs text-muted-foreground break-words">
          {displayLabel}
        </div>
      </div>
    </div>
  );
}
