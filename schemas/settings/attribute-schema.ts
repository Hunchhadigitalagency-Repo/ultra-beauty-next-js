import { z } from "zod";

export const attributeSchema = z.object({
  name: z.string().min(1, { message: "Attribute name is required." }),
  // type: z.string().min(1, { message: "Attribute type is required." }),
  is_active: z.boolean(),
  variations: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Variation name is required." }),
        value: z.string().min(1, { message: "Variation value is required." }),
      })
    )
    .min(1, { message: "At least one variation is required." }),
});

export type AttributeValues = z.infer<typeof attributeSchema>;
