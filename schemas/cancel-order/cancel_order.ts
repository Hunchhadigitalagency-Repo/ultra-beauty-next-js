import * as z from 'zod'

export const CancelOrderSchema = z.object({
    reason: z.string().min(1, { message: "Reason is required" }),
    field: z.string().optional()

});

export type CancelFormValues = z.infer<typeof CancelOrderSchema>;