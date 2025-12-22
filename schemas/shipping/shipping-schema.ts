import { ShippingData } from '@/app/(website)/checkout/components/shipping-details-form';
import * as z from 'zod';


export const ShippingSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email().or(z.literal('')).optional(),
    phone: z.string().min(10, 'Phone number is too short').or(z.literal('')).optional(),
    alternative_phone: z.string().min(10, 'Phone number is too short').or(z.literal('')).optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    landmark: z.string().optional(),
    address: z.string().optional(),
});

export type ShippingFormValues = z.infer<typeof ShippingSchema>;

export const SHIPPING_LABELS: Record<keyof ShippingData, string> = {
  id: "ID",
  first_name: "First Name",
  last_name: "Last Name",
  profile_picture: "Profile Picture",
  phone_no: "Phone Number",
  phone_number: "Phone Number",
  alternate_phone_no: "Alternate Phone",
  email: "Email",
  address: "Address",
  city: "City",
  province: "Province",
  landmark: "Landmark",
  building: "Building / Floor",
};
