import api from "@/services/api-instance";

export const createFlashSales = async (data: FormData) => {
  const response = await api.post("/flashsales/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateFlashSales = async (id: number, data: FormData) => {
  const response = await api.patch(`/flashsales/${id}/`, data);
  return response;
};

export const deleteFlashSales = async (id: number) => {
  const response = await api.delete(`/flashsales/${id}/`);
  return response;
};
