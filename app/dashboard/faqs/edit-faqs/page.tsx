"use client";

import { useAppSelector } from "@/redux/hooks";
import FaqForm from "../components/faq-form";

const EditFaqPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <FaqForm initialData={selectedData} />
    </div>
  );
};

export default EditFaqPage;
