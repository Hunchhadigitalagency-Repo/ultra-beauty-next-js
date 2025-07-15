"use client";

import React from "react";
import ExpertRecommendationForm from "../components/export-recommendation-form";
import { useAppSelector } from "@/redux/hooks";

const EditExpertRecommendationPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <ExpertRecommendationForm initialData={selectedData} />
    </div>
  );
};

export default EditExpertRecommendationPage;
