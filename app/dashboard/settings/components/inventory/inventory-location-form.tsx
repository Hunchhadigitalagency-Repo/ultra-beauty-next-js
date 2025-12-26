"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HeaderBackCard from "@/components/common/cards/header-back-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  inventoryLocationSchema,
  InventoryLocationValues,
} from "@/schemas/settings/inventory-location-schema";

import { IInventory } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import {
  createInventoryLocation,
  updateInventoryLocation,
} from "@/lib/api/settings/inventory-location-api";
import { toast } from "sonner";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { handleError } from "@/lib/error-handler";
import { Search, MapPin, Loader2 } from "lucide-react";

import L from "leaflet";
import useFetchData from "@/hooks/use-fetch";
import { Spinner } from "@/components/ui/spinner";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// TypeScript interfaces
interface InventoryFromProps {
  initialData: IInventory | null;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
}

interface BranchData {
  name: string;
  code: string;
  address: string | null;
  municipality: string;
  district: string;
}

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
}

const InventoryForm = ({ initialData }: InventoryFromProps) => {
  const dispatch = useAppDispatch();

  // Location search states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // Address search states
  const [addressQuery, setAddressQuery] = useState<string>("");
  const [addressResults, setAddressResults] = useState<BranchData[]>([]);
  const [showAddressResults, setShowAddressResults] = useState<boolean>(false);

  const form = useForm<InventoryLocationValues>({
    resolver: zodResolver(inventoryLocationSchema),
    defaultValues: initialData
      ? {
        inventory_name: initialData.inventory_name,
        inventory_address: initialData.inventory_address,
        is_active: initialData.is_active ?? false,
        latitude: initialData?.pin_location?.latitude ?? 0,
        longitude: initialData?.pin_location?.longitude ?? 0,
      }
      : {
        inventory_name: "",
        inventory_address: "",
        is_active: false,
        latitude: 0,
        longitude: 0,
      },
  });

  const { control, watch, setValue, register } = form;

  const lat = watch("latitude");
  const lng = watch("longitude");
  const hasCoords = typeof lat === "number" && typeof lng === "number";

  // Fetch branch data
  const { data: branch } = useFetchData<BranchData[]>('/branches/');

  // Search locations using Nominatim API (OpenStreetMap)
  const searchLocation = useCallback(async (query: string): Promise<void> => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&addressdetails=1`
      );

      if (response.ok) {
        const results: SearchResult[] = await response.json();
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching location:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Search addresses in branch data
  const searchAddress = useCallback((query: string): void => {
    if (!query || query.length < 1) {
      setAddressResults([]);
      return;
    }

    if (!branch || branch.length === 0) {
      setAddressResults([]);
      return;
    }

    // Filter branches based on search query - searches in name, municipality, and district
    const filtered = branch.filter((branchItem: BranchData) =>
      branchItem.name.toLowerCase().includes(query.toLowerCase())
    );

    setAddressResults(filtered.slice(0, 10)); // Limit to 10 results for performance
  }, [branch]);

  // Debounce location search
  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (searchQuery) {
        searchLocation(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchLocation]);

  // Debounced address search
  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      if (addressQuery) {
        searchAddress(addressQuery);
      } else {
        setAddressResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [addressQuery, searchAddress]);

  // Initialize addressQuery with existing field value when editing
  useEffect(() => {
    if (initialData?.inventory_address && !addressQuery) {
      setAddressQuery(initialData.inventory_address);
    }
  }, [initialData, addressQuery]);

  // Location search handlers
  const handleSearchInputChange = (value: string): void => {
    setSearchQuery(value);
    setShowResults(true);
  };

  const selectSearchResult = (result: SearchResult): void => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setValue("latitude", lat, { shouldValidate: true });
    setValue("longitude", lng, { shouldValidate: true });

    // Optionally update the address field with the selected result
    // setValue("inventory_address", result.display_name, { shouldValidate: true });

    setSearchQuery(result.display_name);
    setShowResults(false);
    setSearchResults([]);
  };

  // Address search handlers
  const handleAddressInputChange = (value: string): void => {
    setAddressQuery(value);
    setShowAddressResults(true);
  };

  const selectAddressResult = (branchItem: BranchData): void => {
    // Create a formatted address string
    const addressText = `${branchItem.name}`;
    setValue("inventory_address", addressText, { shouldValidate: true });
    setAddressQuery(addressText);
    setShowAddressResults(false);
    setAddressResults([]);
  };

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setValue("latitude", e.latlng.lat, { shouldValidate: true });
        setValue("longitude", e.latlng.lng, { shouldValidate: true });
      },
    });
    return null;
  }

  const onSubmit = async (data: InventoryLocationValues): Promise<void> => {
setLoading(true)
    const submissionData = {
      inventory_name: data.inventory_name,
      inventory_address: data.inventory_address,
      is_active: data.is_active,
      pin_location: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    };

    try {
      if (initialData) {
        const response = await updateInventoryLocation(
          initialData.id,
          submissionData
        );
        if (response.status === 200) {
          toast.success("Inventory Location updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.INVENTORY_LOCATION));
        }
      } else {
        const response = await createInventoryLocation(submissionData);
        if (response.status === 201) {
          toast.success("Inventory Location created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.INVENTORY_LOCATION));
        }
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={initialData ? "Edit Inventory" : "Add Inventory"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.INVENTORY_LOCATION}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-inventory-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="inventory_name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      INVENTORY NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the Inventory name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Searchable Address Field */}
              <FormField
                control={form.control}
                name="inventory_address"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      INVENTORY ADDRESS
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search for a branch location..."
                            value={addressQuery || field.value || ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const value = e.target.value;
                              handleAddressInputChange(value);
                              field.onChange(value);
                            }}
                            onFocus={() => {
                              if (addressQuery || addressResults.length > 0) {
                                setShowAddressResults(true);
                              }
                            }}
                            onBlur={() => {
                              setTimeout(() => setShowAddressResults(false), 200);
                            }}
                            className="pl-10"
                          />
                        </div>

                        {showAddressResults && addressResults.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {addressResults.map((branchItem: BranchData) => (
                              <div
                                key={branchItem.code}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={() => selectAddressResult(branchItem)}
                                onMouseDown={(e: React.MouseEvent) => {
                                  e.preventDefault();
                                }}
                              >
                                <div className="flex flex-col space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm font-medium text-gray-900">
                                      {branchItem.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* No results found */}
                        {showAddressResults && addressQuery && addressResults.length === 0 && branch && branch.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                              No branches found matching {addressQuery}
                            </div>
                          </div>
                        )}

                        {/* Loading state for branch data */}
                        {!branch && addressQuery && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                            <div className="px-4 py-3 text-sm text-gray-500 text-center flex items-center justify-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Loading branches...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location Search */}
              <div className="space-y-1">
                <FormLabel className="text-muted-foreground">
                  SEARCH LOCATION
                </FormLabel>
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search for a location..."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value)}
                      onFocus={() => setShowResults(true)}
                      className="pl-10"
                    />
                    {isSearching && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
                    )}
                  </div>

                  {/* Search Results Dropdown */}
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {searchResults.map((result: SearchResult) => (
                        <div
                          key={result.place_id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => selectSearchResult(result)}
                        >
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-700 truncate">
                              {result.display_name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={control}
                name="latitude"
                render={() => (
                  <FormItem>
                    <FormLabel>PIN ON MAP</FormLabel>
                    <FormControl>
                      <div className="h-80 w-full rounded-sm overflow-hidden border z-0">
                        <MapContainer
                          center={hasCoords ? [lat, lng] : [27.7172, 85.3240]} // Default to Kathmandu
                          zoom={hasCoords ? 13 : 12}
                          style={{ height: "100%", width: "100%" }}
                        >
                          <TileLayer
                            url="https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}"
                            attribution="Map data © Google Road"
                          />
                          <ClickHandler />
                          {hasCoords && <Marker position={[lat, lng]} />}
                          {hasCoords && <Recenter lat={lat} lng={lng} />}
                        </MapContainer>
                      </div>
                    </FormControl>
                    {/* Display coordinates outside FormControl */}
                    {hasCoords && (
                      <div className="text-xs text-gray-500 mt-2">
                        Coordinates: {lat.toFixed(6)}, {lng.toFixed(6)}
                      </div>
                    )}
                    {/* Hidden inputs outside FormControl */}
                    <input
                      type="hidden"
                      {...register("latitude", { valueAsNumber: true })}
                    />
                    <input
                      type="hidden"
                      {...register("longitude", { valueAsNumber: true })}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="is_active"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="is_active"
                      className="text-muted-foreground"
                    >
                      ACTIVATE
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-inventory-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Changes"}
        </Button>
      </div>
    </>
  );
};

export default InventoryForm;