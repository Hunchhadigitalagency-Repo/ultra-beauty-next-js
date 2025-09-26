"use client";

import { useState, useEffect, useCallback } from "react";

import { useAppSelector } from "@/redux/hooks";
import { ICoupon } from "@/types/cupons";
import api from "@/services/api-instance";

interface ICouponCounts {
  total_coupon_count: number;
  general_coupon_count: number;
  influencer_coupon_count: number;
}

export interface InfiniteFetchResult {
  data: ICoupon[];
  counts: ICouponCounts;
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
}

export function useInfiniteFetchCoupons(baseUrl: string): InfiniteFetchResult {
  const { searchQuery } = useAppSelector((state) => state.filter);

  const buildUrl = useCallback(
    (url: string | null) => {
      if (!url) return null;

      const fullUrl = url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_API_URL}${url.replace(/^\/+/, "")}`;

      const u = new URL(fullUrl);

      u.searchParams.set("search_coupon", searchQuery || "");

      return u.toString();
    },
    [searchQuery]
  );

  const { refetch } = useAppSelector((state) => state.table);

  const [data, setData] = useState<ICoupon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(buildUrl(baseUrl));
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<ICouponCounts>({
    total_coupon_count: 0,
    general_coupon_count: 0,
    influencer_coupon_count: 0,
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
      setCounts({
        total_coupon_count: payload?.total_coupon_count,
        general_coupon_count: payload?.general_coupon_count,
        influencer_coupon_count: payload?.influencer_coupon_count,
      });
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
      total_coupon_count: 0,
      general_coupon_count: 0,
      influencer_coupon_count: 0,
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
