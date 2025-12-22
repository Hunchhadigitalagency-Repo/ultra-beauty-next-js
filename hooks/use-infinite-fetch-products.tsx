
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import api from "@/services/api-instance";

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
  const { refetch } = useAppSelector((state) => state.table);

  // Use refs to track current request and prevent race conditions
  const currentRequestRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [data, setData] = useState<IProduct[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<IProductCounts>({
    total: 0,
    available: 0,
    disabled: 0,
    featured: 0,
  });

  const buildUrl = useCallback(
    (url: string | null) => {
      if (!url) return null;

      const fullUrl = url.startsWith("http")
        ? url
        : `${process.env.NEXT_PUBLIC_API_URL}${url.replace(/^\/+/, "")}`;

      const u = new URL(fullUrl);
      if (searchQuery) {
        u.searchParams.set("search_product", searchQuery);
      } else {
        u.searchParams.delete("search");
      }

      if (criteria?.categories?.length) {
        u.searchParams.set("category", criteria?.categories?.join(","));
      } else {
        u.searchParams.delete("category");
      }

      if (criteria?.subcategories?.length) {
        u.searchParams.set("subcategory", criteria.subcategories.join(","));
      } else {
        u.searchParams.delete("subcategory");
      }

      if (criteria?.priceRange?.[0]) {
        u.searchParams.set("min_price", criteria.priceRange[0].toString());
      } else {
        u.searchParams.delete("min_price");
      }

      if (criteria?.priceRange?.[1]) {
        u.searchParams.set("max_price", criteria.priceRange[1].toString());
      } else {
        u.searchParams.delete("max_price");
      }

      if (criteria?.inventories?.length) {
        u.searchParams.set("inventory", criteria.inventories.join(","));
      } else {
        u.searchParams.delete("inventory");
      }

      if (criteria?.brands?.length) {
        u.searchParams.set("brand", criteria.brands.join(","));
      } else {
        u.searchParams.delete("brand");
      }


      return u.toString();
    },
    [searchQuery, criteria]
  );

  const fetchData = useCallback(async (url: string, isInitial = false) => {
    // Cancel any existing request
    if (currentRequestRef.current) {
      currentRequestRef.current.abort();
    }

    // Create new abort controller for this request
    const controller = new AbortController();
    currentRequestRef.current = controller;

    // Generate unique request ID to handle race conditions
    const requestId = ++requestIdRef.current;

    try {
      setLoading(true);

      const response = await api.get(url, {
        signal: controller.signal,
      });

      // Check if this is still the latest request
      if (requestId !== requestIdRef.current) {
        return; // Ignore outdated response
      }

      const payload = response.data;

      if (Array.isArray(payload.results)) {
        if (isInitial) {
          setData(payload.results);
        } else {
          setData((prev) => [...prev, ...payload.results]);
        }
      }

      setNextUrl(payload.links?.next ?? null);
      setCounts(payload?.counts ?? {
        total: 0,
        available: 0,
        disabled: 0,
        featured: 0
      });

    } catch (err: any) {
      if (err.name !== 'AbortError' && requestId === requestIdRef.current) {
        console.error("useFetchProducts error:", err);
        setNextUrl(null);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        currentRequestRef.current = null;
      }
    }
  }, []);

  const debouncedFetchInitial = useCallback((url: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchData(url, true);
    }, 300);
  }, [fetchData]);

  useEffect(() => {
    const newUrl = buildUrl(baseUrl);
    if (newUrl) {
      setData([]);
      setCounts({ total: 0, available: 0, disabled: 0, featured: 0 });

      debouncedFetchInitial(newUrl);
    }
  }, [baseUrl, buildUrl, refetch, debouncedFetchInitial]);

  const fetchNext = useCallback(() => {
    if (nextUrl && !loading) {
      fetchData(nextUrl, false);
    }
  }, [nextUrl, loading, fetchData]);

  useEffect(() => {
    return () => {
      if (currentRequestRef.current) {
        currentRequestRef.current.abort();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    counts,
    loading,
    hasMore: Boolean(nextUrl),
    fetchNext,
  };
}