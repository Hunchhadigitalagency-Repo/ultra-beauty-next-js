import z from "zod";

export const testimonialSchema = z.object({
    name: z.string().min(2, "Name is required"),
    designation: z.string().min(2, "Designation is required"),
    company: z.string().min(2, "Company is required"),
    message: z.string().min(5, "Message must be at least 5 characters"),
    image: z.any(),
    rating: z.number().min(1, "Please provide a rating"),

});

export type TestimonialForm = z.infer<typeof testimonialSchema>;