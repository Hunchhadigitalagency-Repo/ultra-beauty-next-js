import apiBase from "@/services/api-base-instance";
import {
  forgotPasswordFormSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "@/schemas/auth/auth-schema";

import { z } from "zod";

type ForgotPasswordFormValue = z.infer<typeof forgotPasswordFormSchema>;

export const forgotPasswordApi = async (data: ForgotPasswordFormValue) => {
  try {
    const response = await apiBase.post("/auth/forgot-password/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

type VerifyOtpFormValue = z.infer<typeof verifyOtpSchema>;

export const verifyOtpApi = async (data: VerifyOtpFormValue) => {
  try {
    const response = await apiBase.post("/auth/verify-reset/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

type ResetPasswordFormValue = z.infer<typeof resetPasswordSchema>;

export const resetPasswordApi = async (data: ResetPasswordFormValue) => {
  try {
    const response = await apiBase.post("/auth/reset-password/", data);
    return response;
  } catch (error) {
    throw error;
  }
};
