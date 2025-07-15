import api from "@/services/api-instance";

export const createAdmin = async (data: FormData) => {
  const response = await api.post("/admin/", data);
  return response;
};

export const updateAdmin = async (id: number, data: FormData) => {
  const response = await api.put(`/admin/${id}/`, data);
  return response;
};

export const deleteAdmin = async (id: number) => {
  const response = await api.delete(`/admin/${id}/`);
  return response;
};
