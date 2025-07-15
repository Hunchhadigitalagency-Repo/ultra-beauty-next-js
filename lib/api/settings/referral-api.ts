import api from "@/services/api-instance";

export const createReferral = async (data: FormData) => {
  const response = await api.post("/referral/", data);
  return response;
};

export const updateReferral = async (id: number, data: FormData) => {
  const response = await api.patch(`/referral/${id}/`, data);
  return response;
};

export const deleteReferral = async (id: number) => {
  const response = await api.delete(`/referral/${id}/`);
  return response;
};
