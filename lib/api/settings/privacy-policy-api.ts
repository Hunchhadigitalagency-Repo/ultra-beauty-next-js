import api from "@/services/api-instance";

export const createPrivacyPolicy = async (data: FormData) => {
  const response = await api.post("/privacy-policy/", data);
  return response;
};

export const getPrivacyPolicy = async () => {
  const response = await api.get(`/privacy-policy/`);
  return response;
};
