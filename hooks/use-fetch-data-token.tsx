import { useEffect, useState } from "react";
import api from "@/services/api-instance";

interface FetchResult<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
}

const useFetchDataToken = <T = any>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("fetched token caled");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url);
        console.log("Fetched from token API:", response.data.links);
        setData(response.data.results);
      } catch (err: any) {
        console.error("Error in useFetchDataToken:", err);
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchDataToken;
