import { z } from "zod";
const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Desgination is required"),
  company: z.string().min(1, "Company is required"),
  message: z.string().min(1, "Message is required"),
  image: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Image is required." }),
  ]),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  is_active: z.boolean(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
