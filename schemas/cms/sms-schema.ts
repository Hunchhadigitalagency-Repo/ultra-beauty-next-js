
import { z } from "zod";

export const smsSchema = z.object({
title: z.string().min(1, { message: "Template is required." }),
users: z.any().optional(),
subject_header: z.string().min(1, { message: "Subject Header is required." }),
is_active: z.boolean(),
is_saved_as_template: z.boolean(),
message: z.string().min(1, { message: "Message is required." }),
})

export type SmsFormValues = z.infer<typeof smsSchema>;