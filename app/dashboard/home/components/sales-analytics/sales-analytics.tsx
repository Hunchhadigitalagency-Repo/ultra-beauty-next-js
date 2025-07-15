"use client";

import DataCard from "@/components/common/cards/data-card";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mar 1", value: 45000 },
  { day: "Mar 2", value: 35000 },
  { day: "Mar 3", value: 33000 },
  { day: "Mar 4", value: 28000 },
  { day: "Mar 5", value: 35000 },
  { day: "Mar 6", value: 48000 },
  { day: "Mar 7", value: 25000 },
];

export default function SalesAnalyticsChart() {
  const options = [
    { name: "Week 1", value: 1 },
    { name: "Week 2", value: 2 },
  ];
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <DataCard
      title="Sales Analytics"
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
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
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
              tick={{
                fontSize: 12,
                fontWeight: 400,
              }}
              dy={10}
            />
            <YAxis
              domain={[0, 60000]}
              ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#6B7280",
                fontSize: 12,
                fontWeight: 400,
              }}
              tickFormatter={(value) => `${value / 1000}k`}
              dx={-10}
            />
            <Area
              className="bg-red-600"
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
