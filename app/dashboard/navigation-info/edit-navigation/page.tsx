"use client";

import React from "react";
import NavigationInfoForm from "../components/navigation-info-form";
import { useAppSelector } from "@/redux/hooks";

const EditNavigationInfoPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <NavigationInfoForm initialData={selectedData} />
    </div>
  );
};

export default EditNavigationInfoPage;
