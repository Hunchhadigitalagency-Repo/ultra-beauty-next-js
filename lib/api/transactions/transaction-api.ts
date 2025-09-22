import api from "@/services/api-instance";

export const createTransaction = async (data: any) => {
  const response = await api.post("/transactions/", data);
  return response;
};

export const updateTransaction = async (id: number, data: any) => {
  const response = await api.patch(`/transactions/${id}/`, data);
  return response;
};

export const deleteTransaction = async (id: number ) => {
  const response = await api.delete( `/transactions/${id}/`)
  return response;
}