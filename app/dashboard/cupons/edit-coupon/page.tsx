"use client";

import React from "react";
import CouponForm from "../components/coupons-form";
import { useAppSelector } from "@/redux/hooks";

const EditCouponPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <CouponForm initialData={selectedData} />
    </div>
  );
};

export default EditCouponPage;
