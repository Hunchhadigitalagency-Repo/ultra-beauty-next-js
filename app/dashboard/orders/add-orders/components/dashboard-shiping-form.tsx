"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setShippingInfo } from "@/redux/features/checkout-slice";
import {
  ShippingFormValuesAdmin,
  ShippingSchemaAdmin,
} from "@/schemas/checkout/checkout-dashboard";
import { useAddressData } from "@/hooks/use-address";

type ShippingFormProps = {
  onDataChange: (data: Partial<ShippingFormValuesAdmin>) => void;
  getCity: (data: string) => void;
  isWebsite: boolean;
};

export default function ShippingForm({
  onDataChange,
  getCity,
  isWebsite,
}: ShippingFormProps) {
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { data: PROVINCE } = useAddressData();

  const form = useForm<ShippingFormValuesAdmin>({
    resolver: zodResolver(ShippingSchemaAdmin),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_no: "",
      alternate_phone_no: "",
      province: "",
      city: "",
      landmark: "",
      building: "",
      email: "",
      address: "",
    },
  });

  const watchedValues = useWatch({ control: form.control });
  const selectedProvince = form.watch("province");
  const selectCity = form.watch("city");

  const provinceObj = PROVINCE.find(
    (p) => p.province?.toLowerCase() === selectedProvince?.toLowerCase()
  );

  const cityObj = provinceObj?.areas?.find(
    (a) => a.name?.toLowerCase() === selectCity?.toLowerCase()
  );

  const areaCovered = cityObj?.area_covered ?? [];

  useEffect(() => {
    if (selectCity) {
      getCity(selectCity);
    }
  }, [selectCity, getCity]);

  useEffect(() => {
    if (selectedProvince) {
      const provinceData = PROVINCE.find(
        (p) => p.province === selectedProvince
      );
      setAvailableCities(provinceData?.areas.map((ar) => ar.name) || []);
      form.setValue("city", "");
    } else {
      setAvailableCities([]);
      form.setValue("city", "");
    }
  }, [selectedProvince, form]);

  useEffect(() => {
    onDataChange?.(watchedValues);
  }, [watchedValues, onDataChange]);

  const router = useRouter();

  function onSubmit(values: ShippingFormValuesAdmin) {
    dispatch(setShippingInfo(values));
    if (isWebsite) {
      router.push("/payment");
      return;
    } else {
      router.push("/dashboard/orders/add-orders/payment");
      return;
    }
  }

  return (
    <div className="space-y-6 bg-white">
      <div className="py-2 px-4 bg-[#EBEBEB] rounded-sm font-medium text-custom-black text-base flex justify-between items-center">
        <h2 className="">Shipping details</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-6">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter First Name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Last Name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Number and Alternative Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <FormField
              control={form.control}
              name="phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the phone number"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alternate_phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Alternative Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the alternative phone number"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Province and City with Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Province
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCE.map((provinceData) => (
                          <SelectItem
                            key={provinceData.province}
                            value={provinceData.province}
                          >
                            {provinceData.province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      City
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 justify-left">
                {areaCovered.length > 0 && (
                  <>
                    <p className="text-xs text-red font-medium">
                      Delivery is limited to the following areas:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-left">
                      {areaCovered?.map((ar) => (
                        <span
                          key={ar}
                          className="
                    text-xs 
                    text-gray-500
                  "
                        >
                          {ar},
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Landmark and Building Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Landmark / Area
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the landmark/area"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="building"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Building / floor / Street / House
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the building/floor/street/house"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the email address"
                    type="email"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the full address"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4 p-4">
            <Button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2 rounded-md"
            >
              Continue and Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
