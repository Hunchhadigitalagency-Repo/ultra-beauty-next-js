import api from "@/services/api-instance";

export const createBlogCategory = async (data: FormData) => {
  const response = await api.post("/cms/blog-categories/", data);
  return response;
};

export const updateBlogCategory = async (id: number, data: FormData) => {
  const response = await api.patch(`/cms/blog-categories/${id}/`, data);
  return response;
};

export const deleteBlogCategory = async (id: number) => {
  const response = await api.delete(`/cms/blog-categories/${id}/`);
  return response;
};
