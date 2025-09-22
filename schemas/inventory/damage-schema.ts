import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.coerce.number(),                 // existing variant ID
  quantity: z.coerce.number().optional(), // quantity entered as string
});

export const productItemSchema = z.object({
  product: z.string().min(1, "Select a product"),
  attributeImage: z.boolean().optional(),
  existing_variants: z.array(productVariantSchema).optional(), // existing variants with id + quantity
  quantity: z.coerce.number().optional()
});

export const damageReturnFormSchema = z.object({
  products: z.array(productItemSchema).min(1, "At least one product is required"),
  attachments: z.array(z.instanceof(File)).optional(),
});

export type ProductVariant = z.infer<typeof productVariantSchema>;
export type ProductItem = z.infer<typeof productItemSchema>;
export type damageReturnFormValues = z.infer<typeof damageReturnFormSchema>;