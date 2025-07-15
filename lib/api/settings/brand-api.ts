
import api from "@/services/api-instance";

export const createBrand = async (data: FormData) => {
  const response = await api.post("/brand/", data);
  return response;
};

export const updateBrand = async (id: number, data: FormData) => {
  const response = await api.patch(`/brand/${id}/`, data);
  return response;
};

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`/brand/${id}/`);
  return response;
};
