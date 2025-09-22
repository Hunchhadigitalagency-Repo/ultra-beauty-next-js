import { z } from "zod";

export const careerSchema = z.object({
    title: z.string().min(1, { message: "Job title is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    salary: z.coerce
        .number({ invalid_type_error: "Salary must be a number." })
        .positive()
        .max(1_000_000, { message: "Salary cannot exceed 1,000,000." }),
    position: z.string().min(1, { message: "Position is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    requirement: z.string().min(1, { message: "Requirement is required." }),
    responsibility: z.string().min(1, { message: "Responsibility is required." }),
    job_type: z.string().min(1, { message: "Job type is required." }),
    last_date: z.string().min(1, {
        message: "Last Date is required",
    }),
    is_active: z.boolean(),
});

export type CareerFormValues = z.infer<typeof careerSchema>;
