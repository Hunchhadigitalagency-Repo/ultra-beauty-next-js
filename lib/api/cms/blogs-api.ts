import api from "@/services/api-instance";

export const createBlog = async (data: FormData) => {
  const response = await api.post("/cms/blogs/", data);
  return response;
};

export const updateBlog = async (id: number, data: FormData) => {
  const response = await api.patch(`/cms/blogs/${id}/`, data);
  return response;
};

export const deleteBlog = async (id: number) => {
  const response = await api.delete(`/cms/blogs/${id}/`);
  return response;
};


