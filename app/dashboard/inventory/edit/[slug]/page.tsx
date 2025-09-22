"use client"
import React from "react";
import { useParams } from "next/navigation";
import EditInventoryForm from "../../components/edit-form";

const EditInventory = () => {
  const params = useParams();
  const slug = params?.slug as string;
  if (!slug) return <div>Invalid inventory ID</div>;

  return (
    <EditInventoryForm slug={slug} />
  );
};

export default EditInventory;
