import api from "@/services/api-instance";

export const updateSection = async (id: number, data: FormData) => {
  const response = await api.post(`/section/${id}/`, data);
  return response;
};
