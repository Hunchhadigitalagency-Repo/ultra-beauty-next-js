import api from "@/services/api-instance";

export const createPartnerCompany = async (data: FormData) => {
  const response = await api.post("/cms/partner-companies/", data);
  return response;
};

export const updatePartnerCompany = async (id: number, data: FormData) => {
  const response = await api.patch(`/cms/partner-companies/${id}/`, data);
  return response;
};

export const deletePartnerCompany = async (id: number) => {
  const response = await api.delete(`/cms/partner-companies/${id}/`);
  return response;
};


