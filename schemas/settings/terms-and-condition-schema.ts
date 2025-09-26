import { z } from "zod";

export const termsAndConditionSchema = z.object({
    topic: z.string().min(1, { message: "Topic is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    activate: z.boolean(),
});

export type TermsAndConditionValues = z.infer<typeof termsAndConditionSchema>;
