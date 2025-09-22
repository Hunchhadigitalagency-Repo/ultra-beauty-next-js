"use client";

import React from "react";
import NewsletterForm from "../components/newsletter-form";
import { useAppSelector } from "@/redux/hooks";

const EditNewslettersPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);
  return (
    <div>
      <NewsletterForm initialData={selectedData} />
    </div>
  );
};

export default EditNewslettersPage;
