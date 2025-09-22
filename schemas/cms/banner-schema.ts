import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const bannerSchema = z.object({
  banner_type: z.string().min(1, "Banner Type is required"),
  category: z.string().optional(),
  product: z.string().optional(),
  subcategories: z.array(z.string()).optional(),
  image: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 10MB",
      }),
      z.string().min(1, { message: "Banner Image is required." }),
    ])
    .optional(),
  page: z.string().nullable().optional(),
  is_active: z.boolean(),
});

export type BannerFormValues = z.infer<typeof bannerSchema>;
