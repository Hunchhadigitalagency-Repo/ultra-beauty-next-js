"use client";
import ProductForm from "../add-products/components/product-form";
import { useAppSelector } from "@/redux/hooks";

const EditProductsPage = () => {
  const { selectedData } = useAppSelector((state) => state.authentication);

  return (
    <div>
      <ProductForm initialData={selectedData} />
    </div>
  );
};

export default EditProductsPage;
