"use client";
import DataCard from "@/components/common/cards/data-card";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import useFetchData from "@/hooks/use-fetch";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


export default function InfluencerCart() {
  const [filterType, setFilterType] = useState("week");
  console.log("Filter Type: ", filterType)
  const { data: rawData } = useFetchData<any>(`/order-analytics/`)

  let analyticsData: any[] = []

  if (rawData) {
    analyticsData = rawData.map((item: any) => {
      return {
        day: item.day,
        value: item.sales,
      };
    });
  }


  const options = [
    { name: "Month", value: "month" },
    { name: "Week", value: "week" },
    { name: "Year", value: "year" },
  ];
  const handleChange = (value: string) => {
    setFilterType(value);
  };
  return (
    <DataCard
      title="Influencer Sale Cart"
      className="border w-1/2"
      filter={
        <CustomDropdown
          options={options}
          handleChange={handleChange}
          getValue={(item) => item.value}
          getLabel={(item) => item.name}
          placeholder="Week"
        />
      }
    >
      <div className="w-full h-70">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1477B4" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#1477B4" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#1150761A" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fontWeight: 400 }}
              dy={10}
            />
            <YAxis
              domain={[0, 60000]}
              ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 400 }}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1477B4"
              strokeWidth={0}
              fill="url(#blueGradient)"
              fillOpacity={1}
              animationBegin={0}
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DataCard>
  );
}









