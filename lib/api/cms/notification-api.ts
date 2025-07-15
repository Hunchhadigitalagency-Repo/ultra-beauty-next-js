import { NotificationFormValues } from "@/schemas/cms/notification-schema";
import api from "@/services/api-instance";

export const createNotification = async (data: NotificationFormValues) => {
  const response = await api.post("/cms/notifications/", data);
  return response;
};

export const updateNotification = async (
  id: number,
  data: NotificationFormValues
) => {
  const response = await api.patch(`/cms/notifications/${id}/`, data);
  return response;
};

export const deleteNotification = async (id: number) => {
  const response = await api.delete(`/cms/notifications/${id}/`);
  return response;
};
