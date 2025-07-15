"use client"
import apiBase from "@/services/api-base-instance";
import { useState, useEffect } from "react";

interface FetchDropdownHook<T> {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
}

const useFetchData = <T>(url: string): FetchDropdownHook<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await apiBase.get(url);

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
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
