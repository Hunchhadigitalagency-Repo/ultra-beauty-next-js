import { TaxValues } from "@/schemas/settings/taxes.schema";
import api from "@/services/api-instance";

export const createTax = async (data: TaxValues) => {
  const response = await api.post("/taxes/", data);
  return response;
};

export const updateTax = async (id: number, data: TaxValues) => {
  const response = await api.patch(`/taxes/${id}/`, data);
  return response;
};

export const deleteTax = async (id: number) => {
  const response = await api.delete(`/taxes/${id}/`);
  return response;
};
