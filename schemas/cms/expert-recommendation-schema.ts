import { z } from "zod";

export const expertRecommendationSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  designation: z.string().min(1, { message: "Designation is required." }),
  company: z.string().min(1, { message: "Company is required." }),
  message: z.string().min(1, { message: "Message is required." }),
  recommended_products: z.array(z.string()).optional(),
  // .min(1, { message: "Please select at least one product." }),
  is_active: z.boolean(),
});

export type ExpertRecommendationFormValues = z.infer<
  typeof expertRecommendationSchema
>;
