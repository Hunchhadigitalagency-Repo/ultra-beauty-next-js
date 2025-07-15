"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import FlashSalesForm from "../components/flash-sales-form";

const AddCouponPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <FlashSalesForm initialData={selectedData} />
    </div>
  );
};

export default AddCouponPage;
