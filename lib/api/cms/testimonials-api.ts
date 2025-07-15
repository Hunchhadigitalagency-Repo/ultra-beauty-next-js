import api from "@/services/api-instance";

export const createTestimonials = async (data: FormData) => {
  const response = await api.post("/cms/testimonials/", data);
  return response;
};

export const updateTestimonials = async (id: number, data: FormData) => {
  const response = await api.patch(`/cms/testimonials/${id}/`, data);
  return response;
};

export const deleteTestimonials = async (id: number) => {
  const response = await api.delete(`/cms/testimonials/${id}/`);
  return response;
};
