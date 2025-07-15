import { z } from "zod";

export const seoSchema = z.object({
  metaKeyword: z
    .array(z.string().min(1))
    .min(1, { message: "At least one meta keyword is required." }),
  metaTitle: z.string().min(1, { message: "Meta title is required." }),
  metaDescription: z
    .string()
    .min(1, { message: "Meta description is required." }),
  // primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color"),
  // textColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color"),
  // activate: z.boolean(),
});

export type SeoValues = z.infer<typeof seoSchema>;
