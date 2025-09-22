import { z } from "zod";
import { paginatedSelectSchema } from "../menu/products/product-schema";

export const faqSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  answer: z.string().min(3, "Answer must be at least 3 characters"),
  is_active: z.boolean(),
  type: z.string().min(3, "Page name is required"),
  product: z.array(paginatedSelectSchema).optional(),
}).refine((data) => {
  if (data.type === "product") {
    return Array.isArray(data.product) && data.product.length > 0;
  }
  return true;
}, {
  message: "Products are required when FAQ type is 'products'",
  path: ["products"], // point to the right field
});

export type FaqFormValues = z.infer<typeof faqSchema>;
