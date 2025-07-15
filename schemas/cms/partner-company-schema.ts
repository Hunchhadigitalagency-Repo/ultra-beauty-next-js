import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const partnerCompanySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  link: z.string().min(3, "Link must be at least 3 characters"),
  is_active: z.boolean(),
  logo: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Cover Image is required." }),
  ]),
});

export type PartnerCompanyFormValues = z.infer<typeof partnerCompanySchema>;
