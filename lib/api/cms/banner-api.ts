import api from "@/services/api-instance";

export const createBanner = async (data: FormData) => {
  const response = await api.post("/cms/banners/", data);
  return response;
};

export const updateBanner = async (id: number, data: FormData) => {
  const response = await api.patch(`/cms/banners/${id}/`, data);
  return response;
};

export const deleteBanner = async (id: number) => {
  const response = await api.delete(`/cms/banners/${id}/`);
  return response;
};
