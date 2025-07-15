import { z } from "zod";

export const shippingSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  alternativePhoneNumber: z.string().optional(),
  province: z.string().min(2, {
    message: "Province is required.",
  }),
  city: z.string().min(2, {
    message: "City is required.",
  }),
  landmark: z.string().optional(),
  buildingAddress: z.string().min(5, {
    message: "Building address is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(10, {
    message: "Full address must be at least 10 characters.",
  }),
  communicateUpdates: z.boolean(),
  deliveryLocation: z.enum(["home", "office"], {
    required_error: "Please select a delivery location.",
  }),
})

export type ShippingFormValues = z.infer<typeof shippingSchema>