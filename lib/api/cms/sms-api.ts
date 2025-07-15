
import { SmsFormValues } from "@/schemas/cms/sms-schema";
import api from "@/services/api-instance";

export const createSms = async (data: SmsFormValues) => {
  const response = await api.post("/cms/sms/", data);
  return response;
};

export const updateSms = async (
  id: number,
  data: Partial<SmsFormValues>
) => {
  const response = await api.patch(`/cms/sms/${id}/`, data);
  return response;
};

export const deleteSms = async (id: number) => {
  const response = await api.delete(`/cms/sms/${id}/`);
  return response;
};
