import { z } from "zod";

export const ReviewSchema = z.object({
    review: z.string().min(2, "Review is required"),
    rating: z
        .number()
        .min(1, "Rating is required")
        .max(5, "Rating must be between 1 and 5"),
});

export type ReviewFormValues = z.infer<typeof ReviewSchema>;
