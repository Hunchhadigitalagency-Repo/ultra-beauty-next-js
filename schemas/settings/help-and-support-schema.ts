import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const helpAndSupportSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    description: z.string().min(1, { message: "Description is required." }),
    steps: z.string().min(1, "Steps are required"),
    icon: z.union([
        z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size must be less than 10MB",
        }),
        z.string().min(1, { message: "Icon is required." }),
    ]),
    activate: z.boolean(),
});

export type HelpAndSupportValues = z.infer<typeof helpAndSupportSchema>;
