import api from "@/services/api-instance";

export const getVoucherDetails = async (code: string) => {
  const response = await api.post("/coupons/validate/", { code });
  return response;
};
