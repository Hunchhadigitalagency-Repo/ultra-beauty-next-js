import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import GenericModal from "@/components/common/modals/generic-modal";
import { Button } from "@/components/ui/button";
import {
  ShippingFormValues,
  ShippingSchema,
} from "@/schemas/shipping/shipping-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import api from "@/services/api-instance";
import { ShippingData } from "@/app/(website)/checkout/components/shipping-details-form";
import { PROVINCES } from "@/constants/province-city-data";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingModalProps {
  onClose: () => void;
  shipping: ShippingData | undefined;
}

const ShippingModal: React.FC<ShippingModalProps> = ({ onClose, shipping }) => {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      alternative_phone: "",
      province: "",
      city: "",
      landmark: "",
      address: "",
    },
  });

  const selectedProvince = form.watch("province");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = selectedProvince
    ? PROVINCES.find((p) => p.province === selectedProvince)?.cities || []
    : [];

  /* hydrate form when editing */
  useEffect(() => {
    if (!shipping) return;

    form.reset({
      first_name: shipping.first_name ?? "",
      last_name: shipping.last_name ?? "",
      email: shipping.email ?? "",
      phone: shipping.phone_no ?? "",
      alternative_phone: shipping.alternate_phone_no ?? "",
      province: shipping.province ?? "",
      city: shipping.city ?? "",
      landmark: shipping.landmark ?? "",
      address: shipping.address ?? "",
    });

    setSelectedCity(shipping.city ?? "");
  }, [shipping, form]);

  /* reset city when province changes */
  useEffect(() => {
    setSelectedCity("");
    form.setValue("city", "");
  }, [selectedProvince]);

  const onSubmit = async (data: ShippingFormValues) => {
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_no: data.phone,
        alternate_phone_no: data.alternative_phone,
        province: data.province,
        city: data.city,
        landmark: data.landmark,
        address: data.address,
      };

      await api.post("/default-address/", payload);
      onClose();
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <GenericModal
      title="Change Shipping Details"
      setIsOptionClick={onClose}
      titleClassName="text-primary font-poppins font-normal text-base xl:text-xl"
      modalClassName="max-w-[calc(100%-2rem)] xl:max-w-4xl max-h-[80vh] overflow-scroll"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* First Name */}
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field}  placeholder="Enter your Last Name"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field}  placeholder="Enter your email"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field}  placeholder="Enter your Phone number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alt Phone */}
            <FormField
              control={form.control}
              name="alternative_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternative Phone</FormLabel>
                  <FormControl>
                    <Input {...field}   placeholder="Enter your Alternative Phone number"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Province */}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    value={selectedCity}
                    onValueChange={(val) => {
                      setSelectedCity(val);
                      field.onChange(val);
                    }}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Landmark */}
            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark</FormLabel>
                  <FormControl>
                    <Input {...field}  placeholder="Enter your Landmark"/>
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field}  placeholder="Enter your Address"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full">Save Changes</Button>
        </form>
      </Form>
    </GenericModal>
  );
};

export default ShippingModal;
