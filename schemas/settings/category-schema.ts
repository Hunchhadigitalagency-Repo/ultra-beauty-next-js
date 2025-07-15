import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const categorySchema = z.object({
  categoryName: z.string().min(1, { message: "Cateogry name is required." }),
  categoryImage: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Category image is required." }),
  ]),
  activate: z.boolean(),
});

export const subCategorySchema = z.object({
  category: z.string().min(1, { message: "Cateogry name is required." }),
  name: z.string().min(1, { message: "Sub cateogry name is required." }),
  is_active: z.boolean(),
});

export const blogCategorySchema = z.object({
  blogCategory: z.string().min(1, { message: "Cateogry name is required." }),
  is_active: z.boolean(),
});

export type CategoryValues = z.infer<typeof categorySchema>;
export type SubCategoryValues = z.infer<typeof subCategorySchema>;
export type BlogCategoryValues = z.infer<typeof blogCategorySchema>;
