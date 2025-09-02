"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import {
  ShippingFormValues,
  shippingSchema,
} from "@/schemas/checkout/checkout-schema";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROVINCES } from "@/constants/province-city-data";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addShippingDetails } from "@/redux/features/cart-slice";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";



interface ShippinFormProps {
  onChange: (value: ShippingFormValues) => void;
}


export default function ShippingForm({ onChange }: ShippinFormProps) {

  const dispatch = useAppDispatch();
  const { shippingDetails } = useAppSelector(state => state.cart);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shippingDetails ? shippingDetails : {
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


  const router = useRouter();
  const watchedValues = useWatch({ control: form.control });
  const selectedProvince = watchedValues.province
  const provinceData = PROVINCES.find(
    (p) => p.province === selectedProvince
  );


  useEffect(() => {
    onChange(watchedValues as ShippingFormValues)
  }, [watchedValues, onChange])

  function onSubmit(values: ShippingFormValues) {
    dispatch(addShippingDetails(values));
    router.push('/payment')
  }

  return (
    <div className="space-y-6 bg-white">
      <div className="py-2 px-4 bg-[#EEEEEE] rounded-sm font-medium text-custom-black text-base">
        <h2 className="">Shipping details</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-6">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Voucher Code"
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
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Email Address"
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <FormField
              control={form.control}
              name="phoneNumber"
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

          {/* Province and City */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Province
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your Province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROVINCES.map((province, index) => (
                        <SelectItem key={index} value={province.province}>
                          {province.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    City
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedProvince}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Your Nearest City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinceData?.cities?.map((city, index) => (
                        <SelectItem key={index} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Landmark and Building Address */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
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
              name="buildingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Building / floor / Street / House
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Communication Updates Checkbox */}
          <FormField
            control={form.control}
            name="communicateUpdates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-300"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal text-gray-700">
                    Communicate me shipping updates and offers.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Delivery Location */}
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
              disabled={!form.formState.isValid}
              type="submit"
              className="px-8 py-2 text-white rounded-md bg-primary"
            >
              Continue and Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
