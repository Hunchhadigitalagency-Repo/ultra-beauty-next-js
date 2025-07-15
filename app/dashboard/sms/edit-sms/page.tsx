"use client"
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import SmsForm from "../components/sms-form";

const EditSmsPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <SmsForm initialData={selectedData} />
    </div>
  );
};

export default EditSmsPage;
