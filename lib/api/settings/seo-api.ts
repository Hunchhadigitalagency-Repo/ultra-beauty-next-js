import api from "@/services/api-instance";

export const createSeo = async (data: FormData) => {
  const response = await api.post("/seo-details/", data);
  return response;
};
