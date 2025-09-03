import * as z from 'zod'

export const ReturnFormSchema = z.object({
    reason: z.string().min(1, { message: "Reason is required" }),
    additional_info: z.string().optional(),
    quantity: z.number().min(1, "Quantity must be atleast one"),
    attachment: z
        .array(
            z.object({
                file: z.union([z.instanceof(File), z.string()]),
                id: z.number().optional(),
            })
        )
        .optional(),
});

export type ReturnFormValues = z.infer<typeof ReturnFormSchema>;