import { z } from "zod";
import { paginatedSelectSchema } from "../menu/products/product-schema";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const expertRecommendationSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  designation: z.string().min(1, { message: "Designation is required." }),
  company: z.string().min(1, { message: "Company is required." }),
  message: z.string().min(1, { message: "Message is required." }),
  products: z.array(paginatedSelectSchema).optional(),
  photo: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Brand image is required." }),
  ]),
  is_active: z.boolean(),
});

export type ExpertRecommendationFormValues = z.infer<
  typeof expertRecommendationSchema
>;
