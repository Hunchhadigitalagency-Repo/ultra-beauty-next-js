import api from "@/services/api-instance";

export const createInvoice = async (id: number) => {
  const response = await api.post("/invoices/", {
    order: id,
  });
  return response;
};

export const deleteInvoice = async (id: number) => {
  const response = await api.delete(`/invoices/${id}/`);
  return response;
};

export const updateInvoice = async (id: number, status: string) => {
  const response = await api.patch(`/invoices/${id}/`, {
    status,
  });
  return response;
};
