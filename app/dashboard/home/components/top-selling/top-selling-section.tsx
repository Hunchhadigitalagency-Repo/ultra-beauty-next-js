"use client";

import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { TopSellingConstants } from "./top-selling-constants";

export const tableData = [
  {
    order_id: "ORD123456",
    image: "",
    name: "Running Shoes",
    price: "$59.99",
    status: "Processing",
    sold: "John Doe",
    earnings: 2,
    payment: "Paid",
    order_date: "2025-06-13",
  },
  {
    order_id: "ORD123457",
    image: "",
    name: "Wireless Headphones",
    price: "$89.00",
    status: "Shipped",
    sold: "Jane Smith",
    earnings: 1,
    payment: "Pending",
    order_date: "2025-06-12",
  },
  {
    order_id: "ORD123458",
    image: "",
    name: "Gaming Laptop",
    price: "$1200.00",
    status: "Delivered",
    sold: "Alice Johnson",
    earnings: 1,
    payment: "Paid",
    order_date: "2025-06-11",
  },
];

const TopSellingSection = () => {
  const dispatch = useAppDispatch();

  return (
    <DataCard title="Top Selling" filter={<span>Filter</span>}>
      <CustomTable<any>
        cols={TopSellingConstants(dispatch)}
        data={tableData as any[]}
        loading={false}
        onRowClick={() => {}}
        height="h-auto"
      />
    </DataCard>
  );
};

export default TopSellingSection;
