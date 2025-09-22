import { z } from "zod";
import { paginatedSelectSchema } from "../menu/products/product-schema";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const couponSchema = z.object({
  coupon_type: z.string().min(1, { message: "Coupon type is required." }),
  coupon_name: z.string().min(1, { message: "Coupon name is required." }),
  coupon_code: z.string().min(1, { message: "Coupon code is required." }),
  discount_percentage: z.number(),
  products: z.array(paginatedSelectSchema).optional(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  commission_percentage: z.number().optional(),
  withdrawal_limit: z.number().optional(),
  influencer: z.array(z.string()).optional(),
  coupon_title: z.string().optional(),
  coupon_sub_title: z.string().optional(),
  coupon_image: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 10MB",
      }),
      z.string(),
      // .min(1, { message: "Coupon image is required." }),
    ])
    .optional(),
  expiry_date: z.string().optional(),
  is_active: z.boolean(),
  non_reusable: z.boolean(),
});

export type CouponFormValue = z.infer<typeof couponSchema>;
