import { z } from "zod"

export const paginatedSelectSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const navigationInfoFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  products: z.string().min(1, "Product is required"), 
  is_active: z.boolean(),
})

export type NavigationInfoFormValues = z.infer<typeof navigationInfoFormSchema>
