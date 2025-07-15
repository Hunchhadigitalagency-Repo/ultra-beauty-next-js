import { z } from "zod";

export const contactSchema = z.object({
  firstname: z.string().min(3, "First Name must be at least 3 characters"),
  lastname: z.string().min(3, "Last Name must be at least 3 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;