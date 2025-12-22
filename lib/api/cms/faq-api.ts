import { FaqFormValues } from "@/schemas/cms/faq-schema";
import api from "@/services/api-instance";

export const createFaq = async (data: FaqFormValues) => {
  const response = await api.post("/cms/faqs/", data);
  return response;
};

export const updateFaq = async (id: number | string, data: Partial<FaqFormValues>) => {
  const response = await api.patch(`/cms/faqs/${id}/`, data);
  return response;
};

export const deleteFaq = async (id: number | string) => {
  const response = await api.delete(`/cms/faqs/${id}/`);
  return response;
};


