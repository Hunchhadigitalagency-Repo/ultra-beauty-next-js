"use client"

import DataCard from "@/components/common/cards/data-card";
import { DonutChart } from "@/components/common/charts/donut-chart";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import { cn } from "@/lib/utils";
import { DonutChartItem } from "@/types/dashboard";
import React from "react";

const data = [
  {
    name: "Category 1",
    value: 10,
    color: "#3b82f6",
  },
  {
    name: "Category 2",
    value: 20,
    color: "#10b981",
  },
  {
    name: "Category 3",
    value: 30,
    color: "#f59e0b",
  },
  {
    name: "Category 4",
    value: 40,
    color: "#8b5cf6",
  },
  {
    name: "Category 5",
    value: 50,
    color: "#ef4444",
  },
  {
    name: "Category 6",
    value: 60,
    color: "#06b6d4",
  },
  {
    name: "Category 7",
    value: 70,
    color: "#ec4899",
  },
  {
    name: "Category 8",
    value: 80,
    color: "#f97316",
  },
];

const SalesByCategoryChart = () => {
  const selectedItem: DonutChartItem | null = data.length > 0 ? data[0] : null;
  const centerLabelKey = "name";

  const options = [
    { name: "Week 1", value: 1 },
    { name: "Week 2", value: 2 },
  ];

  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <DataCard
      title="Sales by Category"
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
      <div className="flex flex-col gap-4 md:flex-row p-4 h-[90%]">
        <DonutChart
          data={data}
          centerLabel={
            (selectedItem &&
              (selectedItem[
                centerLabelKey as keyof DonutChartItem
              ] as string)) ||
            ""
          }
          centerValue={selectedItem?.value || 0}
          className="md:flex-[0.5]"
        />

        <div className="overflow-y-auto h-[200px]  md:flex-1">
          <div className="space-y-1">
            {data.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-2 px-4 py-2 text-[13.4px] leading-[18px]"
                )}
              >
                <div className="text-xs">{item.name}</div>
                <div className="text-right">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DataCard>
  );
};

export default SalesByCategoryChart;
