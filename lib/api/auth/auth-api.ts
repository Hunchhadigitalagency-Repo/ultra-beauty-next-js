import apiBase from "@/services/api-base-instance";
import {
  googleLoginFormSchema,
  loginFormSchema,
  registerFormSchema,
} from "@/schemas/auth/auth-schema";

import { z } from "zod";
import api from "@/services/api-instance";

type LoginFormValue = z.infer<typeof loginFormSchema>;

/**
 * Sends a login request to the API
 * @param data - Login form values that adhere to the loginFormSchema
 * @returns API response
 * @throws Throws an error if the request fails
 */

export const login = async (data: LoginFormValue) => {
  try {
    const response = await apiBase.post("/auth/login/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

type GoogleLoginFormValue = z.infer<typeof googleLoginFormSchema>;

export const googleLogin = async (data: GoogleLoginFormValue) => {
  try {
    const response = await apiBase.post("/google-sign-in/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

type RegisterFormValue = z.infer<typeof registerFormSchema>;

/**
 * Sends a login request to the API
 * @param data - Login form values that adhere to the loginFormSchema
 * @returns API response
 * @throws Throws an error if the request fails
 */

export const register = async (data: RegisterFormValue) => {
  try {
    const response = await apiBase.post("/auth/register/", data);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Sends a logout request to the API
 * @param token - Authentication tokepn for the user
 * @returns API response
 * @throws Throws an error if the request fails
 */

export const logout = async (accessToken: string, refreshToken: string) => {
  try {
    console.log(accessToken, refreshToken);
    const response = await api.post("/auth/logout/", { refresh: refreshToken });
    return response;
  } catch (error) {
    throw error;
  }
};
