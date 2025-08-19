import * as z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name is too short")
    .or(z.literal(""))
    .optional(),
  last_name: z
    .string()
    .min(2, "Last name is too short")
    .or(z.literal(""))
    .optional(),
  phone_number: z
    .string()
    .regex(
      /^(97|98)\d{8,}$/,
      "Phone number must start with 97 or 98 and be at least 10 digits"
    )
    .optional(),
  address: z
    .string()
    .min(4, "Address is too short")
    .or(z.literal(""))
    .optional(),
  profile_picture: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 10MB",
      }),
      z.string(),
    ])
    .optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
