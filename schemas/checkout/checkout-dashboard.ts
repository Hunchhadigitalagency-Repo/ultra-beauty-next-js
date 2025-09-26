import { z } from "zod";

export const ShippingSchemaAdmin = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }).nullable().optional(),

  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }).nullable().optional(),

  phone_no: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).nullable().optional(),

  alternate_phone_no: z.string().nullable().optional(),

  email: z.string().email({
    message: "Please enter a valid email address.",
  }).nullable().optional(),

  address: z.string().min(10, {
    message: "Full address must be at least 10 characters.",
  }).nullable().optional(),

  province: z.string().min(2, {
    message: "Province is required.",
  }).nullable().optional(),

  city: z.string().min(2, {
    message: "City is required.",
  }).nullable().optional(),

  landmark: z.string().nullable().optional(),

  building: z.string().min(5, {
    message: "Building address is required.",
  }).nullable().optional(),

  communicateUpdates: z.boolean().nullable().optional(),

  deliveryLocation: z.enum(["home", "office"], {
    required_error: "Please select a delivery location.",
  }).nullable().optional(),
});

export type ShippingFormValuesAdmin = z.infer<typeof ShippingSchemaAdmin>