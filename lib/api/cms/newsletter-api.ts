import { NewsletterFormValues } from "@/schemas/cms/newsletter-schema";
import apiBase from "@/services/api-base-instance";
import api from "@/services/api-instance";

export const createNewsletter = async (data: NewsletterFormValues) => {
  const response = await api.post("/cms/newsletters/", data);
  return response;
};

export const updateNewsletter = async (
  id: number,
  data: Partial<NewsletterFormValues>
) => {
  const response = await api.patch(`/cms/newsletters/${id}/`, data);
  return response;
};

export const deleteNewsletter = async (id: number) => {
  const response = await api.delete(`/cms/newsletters/${id}/`);
  return response;
};


export const createEmail = async (email: string) => {
  const response = apiBase.post('/cms/news-letter-email/', { email })
  return response;
}