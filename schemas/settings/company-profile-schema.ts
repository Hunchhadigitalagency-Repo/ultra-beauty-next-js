import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const companyProfileSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }),
  companyAddress: z
    .string()
    .min(1, { message: "Company address is required." }),
  companyLogo: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Company Logo is required." }),
  ]),
  companyFavIcon: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Company fav icon is required." }),
  ]),
});

export type CompanyProfileValues = z.infer<typeof companyProfileSchema>;
