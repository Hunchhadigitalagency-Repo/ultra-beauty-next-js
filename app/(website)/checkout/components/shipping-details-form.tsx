"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  ShippingFormValues,
  shippingSchema,
} from "@/schemas/checkout/checkout-schema";
import { PROVINCES } from "@/constants/province-city-data";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addShippingDetails,
  setShippingFee,
} from "@/redux/features/cart-slice";

import useFetchData from "@/hooks/use-fetch-data";
import { postCity } from "@/lib/api/order/order-apis";
import { Spinner } from "@/components/ui/spinner";
import api from "@/services/api-instance";

export interface ShippingData {
  id: number;
  first_name: string | null;
  last_name: string | null;
  profile_picture: string;
  phone_no: string | null;
  phone_number: string;
  alternate_phone_no: string | null;
  email: string;
  address: string | null;
  city: string | null;
  province: string | null;
  landmark: string | null;
  building: string | null;
}

interface ShippingFormProps {
  onChange: (value: ShippingFormValues) => void;
}

export default function ShippingForm({ onChange }: ShippingFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { cartItem } = useAppSelector((state) => state.cart);
  const cartIds = cartItem.map((item) => item.id);

  const { data } = useFetchData<ShippingData[]>("/default-address/");
  const [loading, setLoading] = useState(false);
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
      email: "",
      address: "",
      communicateUpdates: false,
      deliveryLocation: "home",
    },
  });

  const selectedProvince = form.watch("province");
  const watchedValues = useWatch({ control: form.control });

  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = selectedProvince
    ? PROVINCES.find((p) => p.province === selectedProvince)?.cities || []
    : [];

  /* Sync form changes to parent */
  useEffect(() => {
    onChange(watchedValues as ShippingFormValues);
  }, [watchedValues, onChange]);

  /* Reset city when province changes */
  useEffect(() => {
    setSelectedCity("");
    form.setValue("city", "");
  }, [selectedProvince]);

  const handleCityChange = async (
    value: string,
    onChange: (val: string) => void
  ) => {
    onChange(value);
    setSelectedCity(value);

    try {
      const response = await postCity(cartIds, value);
      dispatch(setShippingFee(String(response.data.rate)));
    } catch (error) {
      console.error("Failed to update shipping fee", error);
    }
  };

  const handleFillForm = () => {
    if (!data || data.length === 0) return;

    const d = data[0];

    form.reset({
      firstName: d.first_name ?? "",
      lastName: d.last_name ?? "",
      phoneNumber: d.phone_no ?? "",
      alternativePhoneNumber: d.alternate_phone_no ?? "",
      province: d.province ?? "",
      city: d.city ?? "",
      landmark: d.landmark ?? "",
      email: d.email ?? "",
      address: d.address ?? "",
      communicateUpdates: false,
      deliveryLocation: "home",
    });

    setSelectedCity(d.city ?? "");
  };

  const onSubmit = async (values: ShippingFormValues) => {
    setLoading(true);
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone_no: values.phoneNumber,
      alternate_phone_no: values.alternativePhoneNumber,
      province: values.province,
      city: values.city,
      landmark: values.landmark,
      address: values.address,
    };

    await api.post("/default-address/", payload);
    dispatch(addShippingDetails(values));
    router.push("/payment");
  };

  return (
    <div className="space-y-6 bg-white">
      <div className="flex justify-between items-center py-2 px-4 bg-secondary rounded-sm">
        <h2 className="font-medium text-base">Shipping details</h2>
        <Button className="bg-primary" onClick={handleFillForm}>
          Use Default Address
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
          className="px-4 space-y-6"
        >
          {/* Names */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Your First name" />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Your last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phones */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Your Phone number" />
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
                  <FormLabel>Alternative Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter Your Alternative Phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Province & City */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROVINCES.map((p) => (
                        <SelectItem key={p.province} value={p.province}>
                          {p.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    value={selectedCity}
                    onValueChange={(val) =>
                      handleCityChange(val, field.onChange)
                    }
                    disabled={!selectedProvince}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Your Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter Your Landmark" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="communicateUpdates"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Send me shipping updates</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Location</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex gap-6"
                  >
                    <RadioGroupItem value="home" /> Home
                    <RadioGroupItem value="office" /> Office
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isValid || loading}>
              {loading ? <Spinner /> : "Continue and Pay"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
