"use client";

import { useState, useEffect, useCallback } from "react";
import apiBase from "@/services/api-base-instance";

export interface InfiniteFetchNoToken<T> {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
  page: number;
}

export function useInfiniteFetchNoToken<T>(
  baseUrl: string,
  pageSize: number
): InfiniteFetchNoToken<T> {

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const buildUrl = () => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${page}&page_size=${pageSize}`;
  };

  const fetchNext = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await apiBase.get(buildUrl());
      const items: T[] = response.data?.results ?? response.data;
      setData((prev) => [...prev, ...items]);
      if (items.length < pageSize) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("useInfiniteFetchNoToken error:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchNext();
  }, []);
  return { data, loading, hasMore, fetchNext, page };
}
