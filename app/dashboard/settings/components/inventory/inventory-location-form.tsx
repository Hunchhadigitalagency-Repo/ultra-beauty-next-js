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
import { useEffect } from "react";
import {
  createInventoryLocation,
  updateInventoryLocation,
} from "@/lib/api/settings/inventory-location-api";
import { toast } from "sonner";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { handleError } from "@/lib/error-handler";

import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface InventoryFromProps {
  initialData: IInventory | null;
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

  function ClickHandler() {
    useMapEvents({
      click(e) {
        setValue("latitude", e.latlng.lat, { shouldValidate: true });
        setValue("longitude", e.latlng.lng, { shouldValidate: true });
      },
    });
    return null;
  }

  const onSubmit = async (data: InventoryLocationValues) => {
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
              <FormField
                control={form.control}
                name="inventory_address"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      INVENTORY ADDRESS
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the Inventory address."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="latitude"
                render={() => (
                  <FormItem>
                    <FormLabel>PIN ON MAP</FormLabel>
                    <FormControl>
                      <div className="h-80 w-full rounded-sm overflow-hidden border">
                        <MapContainer
                          center={hasCoords ? [lat, lng] : [0, 0]}
                          zoom={hasCoords ? 13 : 2}
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
                      {/* hidden inputs so lat/lng still live in your form state */}
                    </FormControl>
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
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default InventoryForm;
