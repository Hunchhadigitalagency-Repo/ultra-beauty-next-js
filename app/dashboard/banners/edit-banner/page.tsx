"use client";

import React from "react";
import BannerForm from "../components/banner-form";
import { useAppSelector } from "@/redux/hooks";

const AddBannerPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);
  return (
    <div>
      <BannerForm initialData={selectedData} />
    </div>
  );
};

export default AddBannerPage;
