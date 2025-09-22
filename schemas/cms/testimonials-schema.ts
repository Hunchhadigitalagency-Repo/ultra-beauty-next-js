import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const baseSchema = {
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  company: z.string().min(1, "Company is required"),
  is_active: z.boolean(),
};


const textTestimonialSchema = z.object({
  ...baseSchema,
  is_video: z.literal(false),
  message: z.string().min(1, "Message is required"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  image: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 1MB",
      }),
    z.string().min(1, { message: "Image is required." }),
  ]),
});


const videoTestimonialSchema = z.object({
  ...baseSchema,
  is_video: z.literal(true),
  video_url: z.string().url("Valid video URL is required"),
});


export const testimonialSchema = z.discriminatedUnion("is_video", [
  textTestimonialSchema,
  videoTestimonialSchema,
]);

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
