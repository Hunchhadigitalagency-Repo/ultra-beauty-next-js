import api from "@/services/api-instance";

export const createExpertRecommendation = async (data: FormData) => {
  const response = await api.post("/cms/expert-recommendations/", data);
  return response;
};

export const updateExpertRecommendation = async (
  id: number,
  data: FormData
) => {
  const response = await api.patch(`/cms/expert-recommendations/${id}/`, data);
  return response;
};

export const deleteExpertRecommendation = async (id: number) => {
  const response = await api.delete(`/cms/expert-recommendations/${id}/`);
  return response;
};
