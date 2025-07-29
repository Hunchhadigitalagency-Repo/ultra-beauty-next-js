import * as z from 'zod'

export const ReturnFormSchema = z.object({
    reason: z.string().min(1, { message: "Reason is required" }),
    notes: z.string().optional(),
    attachments: z
        .array(
            z.object({
                file: z.union([z.instanceof(File), z.string()]),
                id: z.number().optional(),
            })
        )
        .optional(),
});

export type ReturnFormValues = z.infer<typeof ReturnFormSchema>;