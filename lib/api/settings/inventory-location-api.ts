import api from "@/services/api-instance";
import { IInventory } from "@/types/Settings";

export const createInventoryLocation = async (data: Omit<IInventory, "id">) => {
  const response = await api.post("/inventory/", data);
  return response;
};

export const updateInventoryLocation = async (
  id: number,
  data: Partial<Partial<IInventory>>
) => {
  const response = await api.patch(`/inventory/${id}/`, data);
  return response;
};

export const deleteInventoryLocation = async (id: number) => {
  const response = await api.delete(`/inventory/${id}/`);
  return response;
};
