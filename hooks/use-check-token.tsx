"use client"
import { setAccessToken } from "@/redux/features/authentication-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import apiBase from "@/services/api-base-instance";
import { setAuthToken } from "@/services/api-instance";
import { useState, useCallback, useEffect } from "react";

const useCheckToken = () => {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { accessToken, refreshToken } = useAppSelector(
    (state) => state.authentication
  );

  const checkToken = useCallback(async () => {
    try {
      setAuthToken(accessToken);
      const response = await apiBase.post("/token/verify/", {
        token: accessToken,
      });
      if (response.status === 200) {
        setIsAuthenticated(true); 
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await apiBase.post("/token/refresh/", {
            refresh: refreshToken,
          });
          if (refreshResponse.status === 200) {
            dispatch(setAccessToken(refreshResponse.data.access));
            setAuthToken(refreshResponse.data.access);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false); 
          }
        } catch (refreshError) {
          setIsAuthenticated(false); 
        }
      } else {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false); 
    }
  }, [accessToken, refreshToken, dispatch]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return { isAuthenticated, loading };
};

export default useCheckToken;
