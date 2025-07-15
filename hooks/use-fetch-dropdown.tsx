import { useAppSelector } from "@/redux/hooks";
import apiBase from "@/services/api-base-instance";
import api from "@/services/api-instance";
import { useState, useEffect } from "react";

interface FetchDropdownHook<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

const useFetchDropdown = <T,>(
  url: string,
  isBaseApi?: boolean
): FetchDropdownHook<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const refetch = useAppSelector((state) => state.table.refetch);
  const token = useAppSelector((state) => state.authentication.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = isBaseApi
          ? await apiBase.get<T[]>(url, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          : await api.get<T[]>(url);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (err: unknown) {
        setError(err as Error);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refetch, isBaseApi, token]);

  return { data, loading, error };
};

export default useFetchDropdown;
