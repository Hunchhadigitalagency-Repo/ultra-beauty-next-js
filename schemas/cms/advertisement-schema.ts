import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const advertiseBannerSchema = z.object({
    position: z.string().min(1, "Banner Type is required"),
    product: z.string().min(1, "Product is required"),
    image: z
        .union([
            z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
                message: "File size must be less than 10MB",
            }),
            z.string().min(1, { message: "Banner Image is required." }),
        ])
        .optional(),
    is_active: z.boolean(),
});

export type AdvertiseBannerFormValues = z.infer<typeof advertiseBannerSchema>;