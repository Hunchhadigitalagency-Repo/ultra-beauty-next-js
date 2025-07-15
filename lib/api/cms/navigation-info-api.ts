import api from "@/services/api-instance";

export const createNavigationInfo = async (data: FormData) => {
  const formDataObject: Record<string, any> = {};
  data.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log("FormData being sent:", formDataObject);
  const response = await api.post("/cms/navigation-infos/", data);
  return response;
};

export const updateNavigationInfo = async (id: number, data: FormData) => {
  const response = await api.patch(`/cms/navigation-infos/${id}/`, data);
  return response;
};

export const deleteNavigationInfo = async (id: number) => {
  const response = await api.delete(`/cms/navigation-infos/${id}/`);
  return response;
};
