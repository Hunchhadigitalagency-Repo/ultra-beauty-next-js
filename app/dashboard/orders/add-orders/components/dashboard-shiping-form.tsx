"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import {
  ShippingFormValues,
  shippingSchema,
} from "@/schemas/checkout/checkout-schema";
import { useRouter } from "next/navigation";
import { PROVINCES } from "@/constants/province-constants";
import { useAppDispatch } from "@/redux/hooks";
import { setShippingInfo } from "@/redux/features/checkout-slice";
import useFetchData from "@/hooks/use-fetch";

type ShippingFormProps = {
  onDataChange: (data: Partial<ShippingFormValues>) => void;
  getCity: (data: string) => void;
  isWebsite: boolean,
};

export default function ShippingForm({ onDataChange, getCity, isWebsite }: ShippingFormProps) {
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const dispatch = useAppDispatch()
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      alternativePhoneNumber: "",
      province: "",
      city: "",
      landmark: "",
      buildingAddress: "",
      email: "",
      address: "",
      communicateUpdates: false,
      deliveryLocation: "home",
    },
  });

  const watchedValues = useWatch({ control: form.control });
  const selectedProvince = form.watch("province");
  const selectCity = form.watch("city");

  useEffect(() => {
    if (selectCity) {
      console.log("setting from the form");

      getCity(selectCity)
    }
  }, [selectCity, getCity])


  useEffect(() => {
    if (selectedProvince) {
      const provinceData = PROVINCES.find(p => p.province === selectedProvince);
      setAvailableCities(provinceData?.cities || []);

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

  function onSubmit(values: ShippingFormValues) {
    dispatch(setShippingInfo(values))
    if (isWebsite) {
      router.push("/payment")
      return
    } else {
      router.push("/dashboard/orders/add-orders/payment");
      return
    }
  }

  const { data } = useFetchData<any[]>("/default-address/");

  const handleFillForm = () => {
    if (!data || data.length === 0) return;

    const defaultAddress = data?.[0];

    form.reset({
      firstName: defaultAddress.first_name || "",
      lastName: defaultAddress.last_name || "",
      phoneNumber: defaultAddress.phone_no || "",
      alternativePhoneNumber: defaultAddress.alternate_phone_no || "",
      province: defaultAddress.province || "",
      city: defaultAddress.city || "",
      landmark: defaultAddress.landmark || "",
      buildingAddress: defaultAddress.building || "",
      email: defaultAddress.email || "",
      address: defaultAddress.address || "",
      communicateUpdates: false,
      deliveryLocation: "home",
    });

  };


  return (
    <div className="space-y-6 bg-white">
      <div className="py-2 px-4 bg-[#EBEBEB] rounded-sm font-medium text-custom-black text-base flex justify-between items-center">
        <h2 className="">Shipping details</h2>
        <Button
          className="bg-primary"
          onClick={handleFillForm}
        >
          Use Default Address
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-6">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    First Name
                    <span className="text-red-500 text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter First Name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Last Name
                    <span className="text-red-500 text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Last Name"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Phone Number
                    <span className="text-red-500 text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the phone number"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alternativePhoneNumber"
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Province and City with Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Province
                    <span className="text-red-500 text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select a province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((provinceData) => (
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
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                console.log('this is the value', field.value)
                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      City
                      <span className="text-red-500 text-xl">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue
                            placeholder={"Select a city"
                            }
                          />
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
                )
              }}
            />
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
                    <span className="text-red-500 text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the landmark/area"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Building / floor / Street / House
                    <span className="text-red-500 text-xl">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the building/floor/street/house"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
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
                  <span className="text-red-500 text-xl">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the email address"
                    type="email"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
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
                  <span className="text-red-500 text-xl">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the full address"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Select the label for effective delivery
            </Label>
            <FormField
              control={form.control}
              name="deliveryLocation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="home"
                          id="home"
                          className="border-gray-300"
                        />
                        <Label
                          htmlFor="home"
                          className="text-sm font-normal text-gray-700"
                        >
                          Home
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="office"
                          id="office"
                          className="border-gray-300"
                        />
                        <Label
                          htmlFor="office"
                          className="text-sm font-normal text-gray-700"
                        >
                          Office
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md"
            >
              Continue and Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}