"use client";
import DataCard from "@/components/common/cards/data-card";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import useFetchData from "@/hooks/use-fetch";
import { useState, useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function SalesAnalyticsChart() {
  const [filterType, setFilterType] = useState("week");
  const { data: rawData } = useFetchData<any>(
    `/order-analytics/?time_range=${filterType}`, true
  );

  const analyticsData = useMemo(
    () =>
      rawData?.map((item: any) => ({
        day: item.period,
        value: Math.round(item.sales > 0 && item.sales),
      })) ?? [],
    [rawData]
  );

  const maxSales = Math.max(0, ...analyticsData.map((d: any) => d.value));

  const yTicks = (() => {
    const ticks = [];
    const step = Math.ceil(maxSales / 6 / 10000) * 10000 || 10000;
    for (let i = 0; i <= maxSales + step; i += step) {
      ticks.push(i);
    }
    return ticks;
  })();


  const options = [
    { name: "Month", value: "month" },
    { name: "Week", value: "week" },
    { name: "Year", value: "year" },
  ];

  return (
    <DataCard
      title="Orders Analytics"
      className=""
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
          <AreaChart data={analyticsData} className="">
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b41414ff" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#b41414ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
            <YAxis
              ticks={yTicks}
              tickFormatter={(v) => `${v / 1000}k`}
              tick={{ fontSize: 12, fill: "#806b6bff" }}
              axisLine={false}
              tickLine={false}
              dx={-10}
            />


            <Tooltip
              cursor={{ stroke: "#b41414ff", strokeWidth: 1 }}
              formatter={(value: number) => [`Rs ${value.toLocaleString("en-IN")}`, "Sales"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#b41414ff"
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
