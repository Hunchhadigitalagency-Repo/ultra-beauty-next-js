import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const bannerSchema = z.object({
  banner_type: z.string().min(1, "Banner Type is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().min(3, "Sub Title must be at least 3 characters"),
  product: z.string().min(1, "product is required"),
  categories: z.array(z.string()).optional(),
  subcategories: z.array(z.string()).optional(),
  image: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 10MB",
      }),
      z.string().min(1, { message: "Banner Image is required." }),
    ])
    .optional(),
  discount_percentage: z
    .number()
    // .positive()
    // .min(1, "Discount Percentage is required")
    .optional(),
  expiry_datetime: z
    .string()
    // .min(1, { message: "Date and time is required." })
    .optional(),
  is_active: z.boolean(),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;
