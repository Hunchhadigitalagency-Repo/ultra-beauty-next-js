"use client";
import { ETypes } from "@/types/table";
import api from "@/services/api-instance";
import { useAppSelector } from "@/redux/hooks";
import apiBase from "@/services/api-base-instance";
import { useState, useEffect, useCallback, useRef } from "react";

export interface InfiniteFetchResult<T> {
  data: T[];
  count: number;
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
}

export function useInfiniteFetch<T>(
  path: string,
  queryParam?: string,
  queryValue?: string,
  type?: string,
  token?: boolean
): InfiniteFetchResult<T> {

  const { criteria } = useAppSelector((state) => state.filter);

  const buildUrl = useCallback(
    (url: string | null) => {
      if (!url) return null;

      const fullUrl = url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_API_URL}${url.replace(/^\/+/, "")}`;

      const u = new URL(fullUrl);

      if (queryParam) {
        u.searchParams.set(queryParam, queryValue || "");
      }

      switch (type) {
        case ETypes.ORDERS:
          u.searchParams.set("status", criteria?.status || "");
          break;

        default:
      }

      return u.toString();
    },
    [queryParam, queryValue, criteria, type]
  );

  const { refetch, } = useAppSelector((state) => state.table);

  const [data, setData] = useState<T[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(buildUrl(path));
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0)
  const initialLoadRef = useRef(true);

  const API = token ? api : apiBase;

  const fetchNext = useCallback(async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    try {
      const response = await API.get(nextUrl);
      const payload = response.data;
      if (Array.isArray(payload.results)) {
        setData((prev) => {
          const newItems = payload.results.filter(
            (item: any) => !prev.some((p: any) => p.slug_name === item.slug_name)
          );
          return [...prev, ...newItems];
        });

      }
      setNextUrl(payload.links?.next ?? null);
      setCount(payload?.count ?? 0);
    } catch (err) {
      console.error("useInfiniteFetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      fetchNext();
    }
  }, [fetchNext]);

  // reset data when path changes
  useEffect(() => {
    setData([]);
    setCount(0);
    setNextUrl(buildUrl(path)); // just set URL, don't fetch yet
  }, [path, buildUrl, refetch]);

  // run fetch when nextUrl changes
  useEffect(() => {
    if (nextUrl) {
      fetchNext();
    }
  }, [nextUrl, fetchNext]);


  return {
    data,
    count,
    loading,
    hasMore: Boolean(nextUrl),
    fetchNext,
  };
}
