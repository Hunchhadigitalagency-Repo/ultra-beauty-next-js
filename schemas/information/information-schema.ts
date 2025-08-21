import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const fileSchema = z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 10MB",
    }),
    z.string().min(1, "File is required")
]);

export const informationSchema = z.object({
    fullname: z.string().min(3, "First Name must be at least 3 characters"),
    email: z.string().email("Email Address is required"),
    phone: z.string().min(10, "Phone number should be at least 10 characters long"),
    position: z.string().min(3, "Position must be selected"),
    cv: fileSchema,
    cover_letter: fileSchema,
    g_recaptcha_response: z.string().min(1, "reCAPTCHA verification failed"),
});

export type InformationFormValues = z.infer<typeof informationSchema>;
