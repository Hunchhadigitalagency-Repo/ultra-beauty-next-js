import api from "@/services/api-instance";

export const createTestimonials = async (data: FormData) => {
  const response = await api.post("/cms/testimonials/", data);
  return response;
};

export const updateTestimonials = async (id: number | string, data: FormData) => {
  const response = await api.patch(`/cms/testimonials/${id}/`, data);
  return response;
};

export const deleteTestimonials = async (id: string | number) => {
  const response = await api.delete(`/cms/testimonials/${id}/`);
  return response;
};

export const createUserTestimonials = async (data: FormData) => {
    const response = await api.post("cms/user-testimonials/", data);
  return response;
}

export const updateUserTestimonials = async (data: FormData, slug: string ) => {
    const response = await api.post(`cms/user-testimonials/${slug}`, data);
  return response;
}