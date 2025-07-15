import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const brandSchema = z.object({
  brandName: z.string().min(1, { message: "Brand name is required." }),
  brandImage: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Brand image is required." }),
  ]),
  activate: z.boolean(),
});

export type BrandValues = z.infer<typeof brandSchema>;
