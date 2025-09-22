import { z } from "zod";

export const variantClassSchema = z.object({
  attribute: z.string(),
  attribute_variant: z.string(),
  attribute_name: z.string(),
  variant_name: z.string(),
});

export const variantItemSchema = z.object({
  name: z.string().optional(),
  price: z.coerce.number().optional(),
  quantity: z.coerce.number().min(0, "Quantity must be at least 0"),
  image: z.any().nullable(),
  variant_classes: z.array(variantClassSchema),
});

export const productVariantSchema = z.object({
  id: z.coerce.number(),
  quantity: z.coerce.number().optional(),
});

export const purchaseFormSchema = z.object({
  product: z.string().min(1, "Select a product"),
  sameAsParentName: z.boolean().optional(),
  attributePrice: z.boolean().optional(),
  attributeDiscount: z.boolean().optional(),
  attributeImage: z.boolean().optional(),
  variantItems: z.array(variantItemSchema).optional(),
  existing_variants: z.array(productVariantSchema).optional(),
  attachments: z.array(z.instanceof(File)).optional(),
  quantity: z.coerce.number().optional()
});

export type VariantClass = z.infer<typeof variantClassSchema>;
export type VariantItem = z.infer<typeof variantItemSchema>;
export type ProductVariant = z.infer<typeof productVariantSchema>;
export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;
