"use client";

import DataCard from "@/components/common/cards/data-card";
import { DonutChart } from "@/components/common/charts/donut-chart";
import CustomDropdown from "@/components/common/filter/custom-dropdown";
import { cn } from "@/lib/utils";
import { DonutChartItem } from "@/types/dashboard";
import { getSaleByCategory } from "@/lib/api/order/sale-analytics";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Define Tailwind-compatible color classes
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

const CouponSalesByCategoryChart = () => {
  const [data, setData] = useState<DonutChartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DonutChartItem | null>(null);
  const [filter, setFilter] = useState<string>("month");

  const options = [
    { name: "Month", value: "month" },
    { name: "Year", value: "year" },
    { name: "Week", value: "week" },
  ];

  const handleChange = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    const fetchCategorySales = async () => {
      try {
        const response = await getSaleByCategory();

        const chartData =
          response.data?.category_order_counts?.map(
            (item: any, index: number) => ({
              name: item.category_name,
              value: item.percentage_of_total_products,
              color: chartColors[index % chartColors.length],
            })
          ) || [];

        setData(chartData);
        setSelectedItem(chartData[0] || null);
      } catch (error) {
        toast.error(`Failed to fetch category sales:${error}`);
      }
    };

    fetchCategorySales();
  }, [filter]);

  return (
    <DataCard
      title="Sales by Category"
      filter={
        <CustomDropdown
          options={options}
          handleChange={handleChange}
          getValue={(item) => item.value}
          getLabel={(item) => item.name}
          placeholder="Filter"
        />
      }
    >
      <div className="flex flex-col gap-4 md:flex-row p-4 h-[90%]">
        <DonutChart
          data={data}
          centerLabel={selectedItem?.name || ""}
          centerValue={selectedItem?.value || 0}
          className="md:flex-[0.5]"
        />

        <div className="overflow-y-auto h-[200px] md:flex-1">
          <div className="space-y-1">
            {data.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-2 px-4 py-2 text-[13.4px] leading-[18px]"
                )}
              >
                <div className="text-xs">{item.name}</div>
                <div className="text-right">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DataCard>
  );
};

export default CouponSalesByCategoryChart;
