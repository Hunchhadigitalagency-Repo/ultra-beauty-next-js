import api from "@/services/api-instance";

export const createTermsAndCondition = async (data: FormData) => {
  const response = await api.post("/terms-conditions/", data);
  return response;
};

export const getTermsAndCondition = async () => {
  const response = await api.get(`/terms-conditions/`);
  return response;
};
