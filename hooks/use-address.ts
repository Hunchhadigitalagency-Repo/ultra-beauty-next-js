import { useEffect, useState } from "react";
import axios from "axios";

type BranchApiItem = {
  pk: number;
  code: string;
  name: string;
  areas_covered: string | null;
  province_name: string | null;
  district_name: string | null;
};

export type ProvinceGroupedData = {
  province: string;
  areas: Array<{
    name: string; // district name
    area_covered: string[];
  }>;
};

const splitAreas = (areas: string | null): string[] => {
  if (!areas) return [];
  return areas
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};

export const useAddressData = () => {
  const [data, setData] = useState<ProvinceGroupedData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get<BranchApiItem[]>(
          "https://portal.nepalcanmove.com/api/v2/branches"
        );

        const branches = response.data ?? [];

        // province -> district -> Set(areas)
        const grouped = new Map<string, Map<string, Set<string>>>();

        for (const item of branches) {
          const province = (item.province_name || "UNKNOWN").trim();
          const district = (item.name || "UNKNOWN").trim();

          if (!grouped.has(province)) grouped.set(province, new Map());
          const districtMap = grouped.get(province)!;

          if (!districtMap.has(district)) districtMap.set(district, new Set());
          const areaSet = districtMap.get(district)!;

          splitAreas(item.areas_covered).forEach((area) => areaSet.add(area));
        }

        const formatted: ProvinceGroupedData[] = Array.from(grouped.entries())
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([province, districtMap]) => ({
            province,
            areas: Array.from(districtMap.entries())
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([name, areaSet]) => ({
                name,
                area_covered: Array.from(areaSet).sort(),
              })),
          }));

        if (mounted) setData(formatted);
      } catch (err) {
        if (mounted) {
          setError("Failed to load address data");
          setData([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
};
