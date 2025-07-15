import { z } from "zod";

export const navigationInfoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  discount_percentage: z
    .number()
    .positive()
    .min(1, "Discount Percentage is required"),
  expiry_datetime: z.string().min(1, { message: "Date and time is required." }),
  products: z.array(z.string()).optional(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  is_active: z.boolean(),
});

export type NavigationInfoFormValues = z.infer<typeof navigationInfoSchema>;
