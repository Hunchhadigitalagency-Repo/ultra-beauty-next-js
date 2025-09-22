"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { ETypes } from "@/types/table";
import { useAppSelector } from "@/redux/hooks";
import apiBase from "@/services/api-base-instance";
import api from "@/services/api-instance";

export interface InfiniteFetchResult<T> {
  data: T[];
  count: number;
  loading: boolean;
  hasMore: boolean;
  isBaseUrl?: boolean;
  totalCount?: number;
  fetchNext: () => void;
}

export function useInfiniteFetch<T>(
  path: string,
  queryParam?: string,
  queryValue?: string,
  type?: string,
  isBaseUrl?: boolean
): InfiniteFetchResult<T> {
  const { criteria } = useAppSelector((state) => state.filter);
  const { refetch } = useAppSelector((state) => state.table);

  const buildUrl = useCallback(
    (url: string | null) => {
      if (!url) return null;

      const fullUrl = url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_API_URL}${url.replace(/^\/+/, "")}`;

      const u = new URL(fullUrl);

      if (queryParam && queryValue) {
        u.searchParams.set(queryParam, queryValue);
      }

      switch (type) {
        case ETypes.ORDERS:
          u.searchParams.set("status", criteria?.status || "");
          u.searchParams.set("order_id", criteria?.order_id || "");
          u.searchParams.set("order_status", criteria?.order_status || "");
          u.searchParams.set(
            "total_amount",
            criteria?.grand_total?.toString() || ""
          );
          u.searchParams.set("customer_name", criteria?.customer_name || "");
          u.searchParams.set("email", criteria?.email || "");
          u.searchParams.set("start_date", criteria?.start_date || "");
          u.searchParams.set("end_date", criteria?.end_date || "");
          break;

        case ETypes.SALES:
          u.searchParams.set("start_date", criteria?.start_date || "");
          u.searchParams.set("end_date", criteria?.end_date || "");
          break; // Fixed: Added missing break statement

        case ETypes.INVENTORY:
          u.searchParams.set(
            "category",
            (criteria?.categories || []).join(",")
          );
          u.searchParams.set("action_type", criteria?.action_type || "");
          break;

        default:
          break;
      }

      return u.toString();
    },
    [queryParam, queryValue, criteria, type]
  );

  const [data, setData] = useState<T[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const apiToUse = isBaseUrl ? apiBase : api;
  const hasInitialized = useRef(false);
  const isExecuting = useRef(false);

  const fetchNext = useCallback(async () => {
    if (!nextUrl || loading || isExecuting.current) return;

    isExecuting.current = true;
    setLoading(true);

    try {
      const response = await apiToUse.get(nextUrl);
      const payload = response.data;

      if (Array.isArray(payload.results)) {
        setTotalCount(payload.total_count || 0); // Fixed: Removed duplicate call
        setData((prev) => [...prev, ...payload.results]);
        setCount((prev) => prev + payload.results.length);
      }

      setNextUrl(payload.links?.next ?? null);
    } catch (err) {
      console.error('Fetch error:', err);
      setData([]);
      setNextUrl(null);
      setCount(0);
      setTotalCount(0);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
      isExecuting.current = false;
    }
  }, [nextUrl, loading, apiToUse]);

  useEffect(() => {
    setData([]);
    setCount(0);
    setTotalCount(0);
    hasInitialized.current = false;
    isExecuting.current = false;
    setNextUrl(buildUrl(path));
  }, [path, buildUrl, refetch]);

  useEffect(() => {
    if (!hasInitialized.current && nextUrl) {
      hasInitialized.current = true;
      fetchNext();
    }
  }, [nextUrl, fetchNext]);

  return {
    data,
    count,
    loading,
    hasMore: Boolean(nextUrl),
    totalCount,
    isBaseUrl,
    fetchNext,
  };
}