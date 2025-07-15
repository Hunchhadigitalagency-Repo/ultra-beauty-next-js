import api from "@/services/api-instance";

export const createCategory = async (data: FormData) => {
  const response = await api.post("/categories/", data);
  return response;
};

export const updateCategory = async (id: number, data: FormData) => {
  const response = await api.patch(`/categories/${id}/`, data);
  return response;
};

export const deleteCategory = async (id: number) => {
  const response = await api.delete(`/categories/${id}/`);
  return response;
};
