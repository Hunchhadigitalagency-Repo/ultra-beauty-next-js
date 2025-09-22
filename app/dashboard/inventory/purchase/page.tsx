"use client";
import useFetchData from "@/hooks/use-fetch";
import PurchaseInventoryForm from "./purchase-inventory-form";

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
    <>
      <PurchaseInventoryForm productOptions={productDropdown?.results || []} />
    </>
  );
};

export default Purchases;
