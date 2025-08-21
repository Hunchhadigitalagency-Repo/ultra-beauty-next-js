import api from "@/services/api-instance";

export const updateMyProfile = async (data: FormData) => {
  const response = await api.put(`auth/profile/`, data);
  return response;
};
