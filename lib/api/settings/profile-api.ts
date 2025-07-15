import api from "@/services/api-instance";

export const updateCompanyProifle = async (data: FormData) => {
  const response = await api.post("/auth/companyprofile/", data);
  return response;
};

export const getCompanyProfile = async () => {
  const response = await api.get("/auth/companyprofile");
  return response;
};

export const updatePersonalProfile = async (data: FormData) => {
  const response = await api.put("/auth/profile/", data);
  return response;
};
