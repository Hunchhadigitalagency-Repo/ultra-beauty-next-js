import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const personalProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  personalAddress: z
    .string()
    .min(1, { message: "Personal address is required." }),
  personalEmail: z
    .string({
      required_error: "Personal Email is required.",
    })
    .email({ message: "Please enter a valid email address." }),
  personalProfile: z.union([
    z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 10MB",
    }),
    z.string().min(1, { message: "Personal profile picture is required." }),
  ]),
});

export type PersonalProfileValues = z.infer<typeof personalProfileSchema>;
