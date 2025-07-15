import api from "@/services/api-instance";

export const createSocialLink = async (data: FormData) => {
  const response = await api.post("/social-links/", data);
  return response;
};

export const updateSocialLink = async (id: number, data: FormData) => {
  const response = await api.patch(`/social-links/${id}/`, data);
  return response;
};

export const deleteSocialLink = async (id: number) => {
  const response = await api.delete(`/social-links/${id}/`);
  return response;
};
