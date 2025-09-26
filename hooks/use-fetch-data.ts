"use client";

import { useAppSelector } from "@/redux/hooks";
import apiBase from "@/services/api-base-instance";
import api from "@/services/api-instance";
import { useState, useEffect } from "react";

interface FetchData<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

const useFetchData = <T>(
  url: string,
  isBaseApi?: boolean,
  enabled: boolean = true
): FetchData<T> => {
  const { refetch } = useAppSelector((state) => state.table);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    if (!enabled) return;
    if (!url) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = isBaseApi
          ? await apiBase.get(url)
          : await api.get(url);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, isBaseApi, refetch]);
  return { data, isLoading, error };
};
export default useFetchData;
