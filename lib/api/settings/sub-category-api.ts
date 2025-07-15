import { SubCategoryValues } from "@/schemas/settings/category-schema";
import api from "@/services/api-instance";

export const createSubCategory = async (data: SubCategoryValues) => {
  const response = await api.post("/subcategories/", data);
  return response;
};

export const updateSubCategory = async (
  id: number,
  data: Partial<SubCategoryValues>
) => {
  const response = await api.patch(`/subcategories/${id}/`, data);
  return response;
};

export const deleteSubCategory = async (id: number) => {
  const response = await api.delete(`/subcategories/${id}/`);
  return response;
};
