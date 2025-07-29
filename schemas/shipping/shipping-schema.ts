import * as z from 'zod';


export const ShippingSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().or(z.literal('')).optional(),
    phone: z.string().min(10, 'Phone number is too short').or(z.literal('')).optional(),
    alternative_phone: z.string().min(10, 'Phone number is too short').or(z.literal('')).optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    landmark: z.string().optional(),
    building_floor_street_house: z.string().optional(),
});

export type ShippingFormValues = z.infer<typeof ShippingSchema>;