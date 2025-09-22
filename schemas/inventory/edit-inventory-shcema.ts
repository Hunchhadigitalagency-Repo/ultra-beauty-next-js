import { z } from "zod"

export const editInventorySchema = z.object({
  product: z.string().min(1, "Product is required"), // Product ID as string
  product_variant: z.string().optional(), // Product variant ID as string
  quantity: z.number().optional(), // Single quantity as integer
  attachment: z.instanceof(File).optional(), // Single file attachment
})

export type EditInventoryFormValues = z.infer<typeof editInventorySchema>
