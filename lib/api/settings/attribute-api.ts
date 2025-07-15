import { AttributeValues } from "@/schemas/settings/attribute-schema";
import api from "@/services/api-instance";

export const createAttribute = async (data: AttributeValues) => {
  const response = await api.post("/attribute/", data);
  return response;
};

export const updateAttribute = async (
  id: number,
  data: Partial<AttributeValues>
) => {
  const response = await api.patch(`/attribute/${id}/`, data);
  return response;
};

export const deleteAttribute = async (id: number) => {
  const response = await api.delete(`/attribute/${id}/`);
  return response;
};
