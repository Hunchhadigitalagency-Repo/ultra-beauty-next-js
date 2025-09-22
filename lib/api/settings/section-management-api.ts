import api from "@/services/api-instance";

export const createSection = async (data: {
  name: string;
  is_active: boolean;
}) => {
  const response = await api.post(`/section/`, data);
  return response;
};

export const updateSection = async (id: number, data: FormData) => {
  const response = await api.post(`/section/${id}/`, data);
  return response;
};
