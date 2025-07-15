import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const adminProfileSchema = z.object({
  adminName: z.string().min(1, { message: "Admin name is required." }),
  adminAddress: z.string().min(1, { message: "Admin address is required." }),
  adminPassword: z.string().min(1, { message: "Admin password is required." }),
  adminEmail: z
    .string({
      required_error: "Admin Email is required.",
    })
    .email({ message: "Please enter a valid email address." }),
  adminProfile: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Admin profile picture is required." }),
  ]),
  activate: z.boolean(),
});

export type AdminProfileValues = z.infer<typeof adminProfileSchema>;
