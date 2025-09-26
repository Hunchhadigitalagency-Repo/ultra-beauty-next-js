"use client";

import React from "react";
import DamageManagementForm from "./damage-inventory-form";
import useFetchData from "@/hooks/use-fetch-data";


interface ProductDropdownItem {
  id: number
  name: string
  slug_name: string
  image: string | null
}

interface ProductDropdownResponse {
  results: ProductDropdownItem[]
}


const Damage = () => {
  const { data: productDropdown } = useFetchData<ProductDropdownResponse>("/products/dropdown/")


  return (
    <DamageManagementForm
      productOptions={productDropdown?.results || []}
    />
  );
};

export default Damage;
