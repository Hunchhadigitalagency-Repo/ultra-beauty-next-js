import { z } from "zod";
import { paginatedSelectSchema } from "../menu/products/product-schema";

export const flashSalesSchema = z
  .object({
    name: z.string().min(3, "Sales name must be at least 3 characters"),
    discount_percentage: z
      .string()
      .regex(/^\d+(\.\d+)?$/, "Discount percentage must be a valid number"),
    start_date: z.string().min(1, {
      message: "Start Date is required.",
    }),
    end_date: z.string().min(1, {
      message: "End Date is required",
    }),
    products: z.array(paginatedSelectSchema).optional(),
    is_active: z.boolean(),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    path: ["end_date"],
    message: "End Date cannot be before Start Date",
  });

export type FlashSalesFormValues = z.infer<typeof flashSalesSchema>;
