"use client";

import { useState, useEffect, useCallback,  } from "react";

import { useAppSelector } from "@/redux/hooks";
import api from "@/services/api-instance";
import { IProduct } from "@/types/product";

interface IProductCounts {
  total: number;
  available: number;
  disabled: number;
  featured: number;
}

export interface InfiniteFetchResult {
  data: IProduct[];
  counts: IProductCounts;
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
}

export function useInfiniteFetchProducts(baseUrl: string): InfiniteFetchResult {
  const { criteria, searchQuery } = useAppSelector((state) => state.filter);

  const buildUrl = useCallback(
    (url: string | null) => {
      if (!url) return null;

      const fullUrl = url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_API_URL}${url.replace(/^\/+/, "")}`;

      const u = new URL(fullUrl);

      u.searchParams.set("search_product", searchQuery || "");

      u.searchParams.set("category", criteria?.categories?.join(",") || "");

      u.searchParams.set(
        "subcategory",
        JSON.stringify(criteria?.subcategories?.join(",")) || ""
      );

      return u.toString();
    },
    [searchQuery, criteria]
  );

  const { refetch } = useAppSelector((state) => state.table);

  const [data, setData] = useState<IProduct[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(buildUrl(baseUrl));
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<IProductCounts>({
    total: 0,
    available: 0,
    disabled: 0,
    featured: 0,
  });

  const fetchNext = useCallback(async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    try {
      const response = await api.get(nextUrl);
      const payload = response.data;
      if (Array.isArray(payload.results)) {
        setData((prev) => [...prev, ...payload.results]);
      }
      setNextUrl(payload.links?.next ?? null);
      setCounts(
        payload?.counts ?? {
          total: 0,
          available: 0,
          disabled: 0,
          featured: 0,
        }
      );
    } catch (err) {
      console.error("useFetchProducts error:", err);
      setNextUrl(null);
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  // Initial load
  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  // Reset when baseUrl or queryValue changes
  useEffect(() => {
    setData([]);
    setCounts({
      total: 0,
      available: 0,
      disabled: 0,
      featured: 0,
    });
    setNextUrl(buildUrl(baseUrl));
  }, [baseUrl, buildUrl, refetch]);

  return {
    data,
    counts,
    loading,
    hasMore: Boolean(nextUrl),
    fetchNext,
  };
}
