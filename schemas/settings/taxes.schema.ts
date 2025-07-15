import { z } from "zod";

export const taxSchema = z.object({
  tax_name: z.string().min(1, { message: "Tax name is required." }),
  tax_percentage: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Tax must be a valid number"),
  is_active: z.boolean(),
});

export type TaxValues = z.infer<typeof taxSchema>;
