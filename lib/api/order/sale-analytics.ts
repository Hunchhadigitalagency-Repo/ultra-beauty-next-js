import api from "@/services/api-instance";

export const getAnalytics = async () => {
  const analytics = await api.get("/order-analytics/");

  return analytics;
};

export const getSaleByCategory = async () => {
  const category = await api.get("/order-category/");
  return category;
};
