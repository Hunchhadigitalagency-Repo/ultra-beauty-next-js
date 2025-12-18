import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const billSchema = z.object({
  billName: z.string().min(1, { message: "Bill name is required." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  companyAddress: z
    .string()
    .min(1, { message: "Company address is required." }),
  panNumber: z.string().min(1, { message: "PAN number is required." }),
  companyLogo: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Company logo is required." }),
  ]),
  activate: z.boolean(),
});

export type BillValues = z.infer<typeof billSchema>;
