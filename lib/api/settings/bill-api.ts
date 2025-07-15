import api from "@/services/api-instance";

export const updateBill = async (data: FormData) => {
  const response = await api.post("/bill-details/", data);
  return response;
};
export const getBill = async () => {
  const response = await api.get("/bill-details/");
  return response;
};
