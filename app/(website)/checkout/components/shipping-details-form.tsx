"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  ShippingFormValues,
  shippingSchema,
} from "@/schemas/checkout/checkout-schema";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


export default function ShippingForm() {

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

  const router = useRouter()

  function onSubmit(values: ShippingFormValues) {
    console.log(values);
    router.push('/payment')
  }

  return (
    <div className="space-y-6 bg-white">
      <div className="py-2 px-4 bg-secondary rounded-sm font-medium text-custom-black text-base">
        <h2 className="">Shipping details</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Province
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    City
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
              type="submit"
              className="bg-primary text-white px-8 py-2 rounded-md"
            >
              Continue and Pay
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
