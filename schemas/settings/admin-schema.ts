import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const adminProfileSchema = z
  .object({
    adminFirstName: z
      .string()
      .min(1, { message: "Admin First name is required." }),
    adminLastName: z.string().min(1, { message: "Admin Last name is required." }),
    adminAddress: z.string().optional(),
    adminPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." }),
    adminConfirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is required." }),
    adminEmail: z
      .string({
        required_error: "Admin Email is required.",
      })
      .email({ message: "Please enter a valid email address." }),
    adminProfile: z.union([
      z.instanceof(File),
      z.string()
    ]).optional(),

    activate: z.boolean().optional(),
  })
  .refine((data) => data.adminPassword === data.adminConfirmPassword, {
    path: ["adminConfirmPassword"],
    message: "Passwords do not match",
  });

export type AdminProfileValues = z.infer<typeof adminProfileSchema>;
