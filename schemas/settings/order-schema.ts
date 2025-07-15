import { z } from "zod";

export const orderSchema = z.object({
  orderStatusName: z
    .string()
    .min(1, { message: "Order status name is required." }),
  primaryColor: z.string().min(1, { message: "Primary Color is required." }),
  textColor: z.string().min(1, { message: "Text Color is required." }),
  activate: z.boolean(),
  isTypeSuccess: z.boolean(),
  isTypeFailed: z.boolean(),
  orderStatusPosition: z.coerce
    .number({ required_error: "" })
    .min(1, { message: "" }),
});

export type OrderValues = z.infer<typeof orderSchema>;

export const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  status: z.string().optional(),
  grandTotal: z.string().optional(),
  customerName: z.string().optional(),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  dateRange: z.string().optional(),
})

export type OrderFilterValues = z.infer<typeof orderFilterSchema>

