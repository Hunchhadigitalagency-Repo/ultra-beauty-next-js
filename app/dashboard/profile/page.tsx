"use client";

import React from "react";
import PersonalProfile from "./components/profile-form";
import { useAppSelector } from "@/redux/hooks";

const PersonalProfilePage = () => {
  const { profileDetails } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <PersonalProfile initialData={profileDetails} />
    </div>
  );
};

export default PersonalProfilePage;
