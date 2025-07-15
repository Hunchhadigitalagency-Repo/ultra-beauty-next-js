import api from "../api-instance"

export const createTransaction = async (data: any) => {
 const response = await api.post("/transaction", data);
 return response;
}

export const updateTransaction = async (id: number, data: any) => {
  const response = await api.put(`/transaction/${id}`, data);
  return response;
}