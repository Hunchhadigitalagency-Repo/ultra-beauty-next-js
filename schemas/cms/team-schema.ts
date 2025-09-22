import { z } from "zod"

export const TeamSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        designation: z.string().min(1, "Designation is required"),
        description: z.string().min(1, "Description is required"),
        is_active: z.boolean(),
        photo: z.union([z.instanceof(File), z.string().min(1, "Photo is required")]),
        linkedin_link: z.string().optional(),
        facebook_link: z.string().optional(),
        twitter_link: z.string().optional(),
        instagram_link: z.string().optional(),
    })
export type TeamFormValues = z.infer<typeof TeamSchema>
