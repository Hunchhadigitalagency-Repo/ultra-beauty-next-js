"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import CareerForm from "../components/career-form";

const EditCareerPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);
  return (
    <div>
      <CareerForm initialData={selectedData} />
    </div>
  );
};

export default EditCareerPage;
