"use client";

import { useState, useEffect } from "react";
import apiBase from "@/services/api-base-instance";

export interface FetchProductResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetchProduct<T>(path: string): FetchProductResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await apiBase.get(path);
        const product: T = response.data;

        if (isMounted) {
          setData(product);
        }
      } catch (err: any) {
        console.error("useFetchProduct error:", err);
        if (isMounted) {
          setError(err?.message ?? "An unknown error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false; // prevent state updates after unmount
    };
  }, [path]);

  return { data, loading, error };
}
