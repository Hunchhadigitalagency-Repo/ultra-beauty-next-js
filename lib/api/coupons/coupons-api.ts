import api from "@/services/api-instance";

export const createCoupons = async (data: FormData) => {
  const response = await api.post("/coupons/", data);
  return response;
};

export const updateCoupons = async (id: number, data: FormData) => {
  const response = await api.patch(`/coupons/${id}/`, data);
  return response;
};

export const deleteCoupons = async (id: number) => {
  const response = await api.delete(`/coupons/${id}/`);
  return response;
};


export const addWithDrawls = async (data: FormData) => {
  const response = await api.post('/influencer-withdrawals/', data)
  return response
}

export const uppdatedWithDrawls = async (data: FormData, id: number) => {
  const response = await api.patch(`/influencer-withdrawals/${id}/`, data)
  return response
}

export const deleteWithDrawls = async (id: number) => {
  const response = await api.delete(`/influencer-withdrawals/${id}/`)
  return response
}