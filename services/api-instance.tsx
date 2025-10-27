import { store } from "@/redux/store";
import axios from "axios";
import { Mutex } from 'async-mutex'
import apiBase from "./api-base-instance";
import { resetAuthentication, setAccessToken, setIsLoading } from "@/redux/features/authentication-slice";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const refreshMutex = new Mutex();

api.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().authentication;
    if (accessToken) {
      config.headers!["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      const oldAccessToken = store.getState().authentication.accessToken;

      await refreshMutex.runExclusive(async () => {
        const currentToken = store.getState().authentication.accessToken;

        if (currentToken && currentToken !== oldAccessToken) return;
        store.dispatch(setIsLoading(true))

        const refreshToken = store.getState().authentication.refreshToken;
        if (!refreshToken) {
          store.dispatch(setIsLoading(false))
          store.dispatch(resetAuthentication());
          window.location.href = "/login";
        }

        try {
          const { data } = await apiBase.post('/token/refresh/', {
            refresh: refreshToken
          });
          const newAccessToken = data.access;
          store.dispatch(setAccessToken(newAccessToken));
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
        } catch (refreshError) {
          store.dispatch(resetAuthentication());
          window.location.href = "/login";
          throw refreshError;
        } finally {
          store.dispatch(setIsLoading(false))
        }
      })

      const updatedToken = store.getState().authentication.accessToken;
      if (!updatedToken) {
        return Promise.reject(error);
      }
      originalRequest.headers["Authorization"] = `Bearer ${updatedToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
