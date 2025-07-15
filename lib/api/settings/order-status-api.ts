import api from "@/services/api-instance";

export const createOrderStatus = async (data: FormData) => {
  const response = await api.post("/order-status/", data);
  return response;
};

export const updateOrderStatus = async (id: number, data: FormData) => {
  const response = await api.patch(`/order-status/${id}/`, data);
  return response;
};

export const deleteOrderStatus = async (id: number) => {
  const response = await api.delete(`/order-status/${id}/`);
  return response;
};
