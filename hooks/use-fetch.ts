"use client"
import api from "@/services/api-instance";
import { useState, useEffect, useCallback } from "react";
import apiBase from "@/services/api-base-instance";

interface FetchDropdownHook<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}
interface UseFetchDataOptions {
  config?: Record<string, any>;
}

const useFetchData = <T>(url: string, token?: boolean,
  { config = {} }: UseFetchDataOptions = {}
): FetchDropdownHook<T> => {

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const API = token ? api : apiBase;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get(url, config || '');
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [API, url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
