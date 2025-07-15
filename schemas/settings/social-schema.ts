import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const socialSchema = z.object({
  socialName: z.string().min(1, { message: "Social name is required." }),
  socialUrl: z.string().min(1, { message: "Social url is required." }),
  socialIcon: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Social Icon is required." }),
  ]),
  activate: z.boolean(),
});

export type SocialValues = z.infer<typeof socialSchema>;
