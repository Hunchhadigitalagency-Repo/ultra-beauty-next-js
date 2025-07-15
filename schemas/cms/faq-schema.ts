import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters"),
  answer: z.string().min(3, "Answer must be at least 3 characters"),
  is_active: z.boolean(),
});

export type FaqFormValues = z.infer<typeof faqSchema>;
