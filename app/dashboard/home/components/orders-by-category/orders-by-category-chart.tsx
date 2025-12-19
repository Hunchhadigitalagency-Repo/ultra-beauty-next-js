"use client";

import DataCard from "@/components/common/cards/data-card";
import { DonutChart } from "@/components/common/charts/donut-chart";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import useFetchData from "@/hooks/use-fetch";
import { cn } from "@/lib/utils";
import { DonutChartItem } from "@/types/dashboard";
import React, { useMemo, useState } from "react";

const chartColors = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ef4444", // red
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#f97316", // orange
];

const SalesByCategoryChart = () => {
  const [filter, setFilter] = useState<string>("week");

  const options = [
    { name: "Month", value: "month" },
    { name: "Year", value: "year" },
    { name: "Week", value: "week" },
  ];

  const { data: rawData } = useFetchData<any>(`/order-category/?time_range=${filter}`, true);

  console.log(rawData, "rawData from ");

  const chartData: DonutChartItem[] = useMemo(() => {
    return (
      rawData?.category_order_counts?.map((item: any, index: number) => ({
        name: item.category_name,
        value: item.percentage_of_total_products,
        color: chartColors[index % chartColors.length],
      })) || []
    );
  }, [rawData]);

  const selectedItem = chartData[0] || { name: "", value: 0 };

  const handleChange = (value: string) => {
    setFilter(value);
  };

  return (
    <DataCard
      title="Orders by Category"
      className="h-auto md:h-[350px]"
      filter={
        <CustomDropdown
          options={options}
          handleChange={handleChange}
          getValue={(item) => item.value}
          getLabel={(item) => item.name}
          placeholder="Week"
          className="-px-2"
        />
      }
    >
      <div className="flex flex-col gap-4 md:flex-row p-4 items-center">
        <DonutChart
          data={chartData}
          centerLabel={selectedItem.name}
          centerValue={selectedItem.value.toFixed(0)}
          className="md:flex-[0.5]"
        />

        <div className="overflow-y-auto h-[200px] md:flex-1">
          <div className="space-y-1">
            {chartData.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-2 px-4 py-2 text-[13.4px] leading-[18px]"
                )}
              >
                <div className="text-xs">{item.name}</div>
                <div className="text-right">{item.value.toFixed(2)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DataCard>
  );
};

export default SalesByCategoryChart;
