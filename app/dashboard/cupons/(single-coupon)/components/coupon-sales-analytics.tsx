"use client";
import DataCard from "@/components/common/cards/data-card";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Define the prop interface to make the component's API explicit
interface ChartData {
  name: string;
  usage: number;
}

interface CouponSalesAnalyticsChartProps {
  chartData: ChartData[];
  setFilterType: (value: string) => void;
  filterType: string;
}

export default function CouponSalesAnalyticsChart({
  chartData,
  setFilterType,
}: CouponSalesAnalyticsChartProps) {
  const options = [
    { name: "Month", value: "month" },
    { name: "Week", value: "week" },
    { name: "Year", value: "year" },
  ];

  // Calculate the max usage for Y-axis ticks
  const maxUsage = useMemo(
    () => Math.max(0, ...chartData.map((d) => d.usage)),
    [chartData]
  );

  const yTicks = useMemo(() => {
    const ticks = [];
    // Set a minimum step to avoid too few ticks for small numbers
    const step = Math.ceil(maxUsage / 6) || 1;
    for (let i = 0; i <= maxUsage + step; i += step) {
      ticks.push(i);
    }
    return ticks;
  }, [maxUsage]);

  return (
    <DataCard
      title="Coupon Usage Analytics"
      className="px-0"
      filter={
        <CustomDropdown
          options={options}
          handleChange={setFilterType}
          getValue={(item) => item.value}
          getLabel={(item) => item.name}
          placeholder="Week"
          className="-px-2"
        />
      }
    >
      <div className="w-full h-70">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1477B4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#1477B4" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* X-Axis now uses the 'name' key */}
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis
              ticks={yTicks}
              // Adjust tick formatter for usage count
              tickFormatter={(v) => `${v}`}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />

            <Tooltip
              cursor={{ stroke: "#1477B4", strokeWidth: 1 }}
              // Adjust the formatter to display 'usage' instead of 'sales'
              formatter={(value: number) => [`${value.toLocaleString("en-IN")}`, "Usage Count"]}
            />
            <Area
              type="monotone"
              dataKey="usage" // Data key is now 'usage'
              stroke="#1477B4"
              strokeWidth={2}
              fill="url(#blueGradient)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DataCard>
  );
}