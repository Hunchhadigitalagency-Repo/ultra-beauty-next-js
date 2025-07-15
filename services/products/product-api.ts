import api from "../api-instance"

export const createProductAttribute = async (data: any) => {
 const response = await api.post("/product-attributes", data);
 return response;
}

export const updateProductAttribute = async (id: number, data: any) => {
  const response = await api.put(`/product-attributes/${id}`, data);
  return response;
}