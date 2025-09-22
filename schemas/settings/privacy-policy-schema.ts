import { z } from "zod";

export const privacyPolicySchema = z.object({
    topic: z.string().min(1, { message: "Topic is required." }),
    effective_date: z.string().min(1, "Effective date is required"),
    description: z.string().min(1, { message: "Description is required." }),
    activate: z.boolean(),
});

export type PrivacyPolicyValues = z.infer<typeof privacyPolicySchema>;
