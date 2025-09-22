"use client";

import React from "react";
import PurchaseReturnManagementForm from "./purchase-return-form";
import useFetchData from "@/hooks/use-fetch";

interface ProductDropdownItem {
  id: number;
  name: string;
  slug_name: string;
  image: string | null;
}

interface ProductDropdownResponse {
  results: ProductDropdownItem[];
}

const Purchases = () => {
  const { data: productDropdown } = useFetchData<ProductDropdownResponse>(
    "/products/dropdown/"
  );

  return (
    <PurchaseReturnManagementForm
      productOptions={productDropdown?.results || []}
    />
  );
};

export default Purchases;
