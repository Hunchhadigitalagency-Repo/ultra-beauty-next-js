import { z } from "zod";
import { paginatedSelectSchema } from "../menu/products/product-schema";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  sub_title: z.string().min(3, "Sub Title must be at least 3 characters"),
  author: z.string().min(1, "Author is required"),
  category: z.string().optional(),
  tags: z.string().min(1, "Tags is required"),
  cover_image: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Cover Image is required." }),
  ]),
  description: z.string().min(1, "Description is required"),
  recommended_products: z.array(paginatedSelectSchema).optional(),
  is_active: z.boolean(),
  send_as_newsletter: z.boolean(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;
