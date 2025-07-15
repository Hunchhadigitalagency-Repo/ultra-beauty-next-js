import api from "@/services/api-instance";

export const createCoupons = async (data: FormData) => {
  const response = await api.post("/coupons/", data);
  return response;
};

export const updateCoupons = async (id: number, data: FormData) => {
  const response = await api.patch(`/coupons/${id}/`, data);
  return response;
};

export const deleteCoupons = async (id: number) => {
  const response = await api.delete(`/coupons/${id}/`);
  return response;
};
