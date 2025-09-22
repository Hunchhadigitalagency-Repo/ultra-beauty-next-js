import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Please enter a valid email to login." }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

export const googleLoginFormSchema = z.object({
  access_token: z
    .string({ required_error: "Access token is required." })
    .min(1, { message: "Please enter a valid  google access token to login." }),
});

export const registerFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Please enter a valid email to register." }),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Must include at least one lowercase.",
      })
      .regex(/[A-Z]/, {
        message: "Must include at least one uppercase .",
      })
      .regex(/[0-9]/, { message: "Must include at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Must include at least one special character.",
      }),
    confirm_password: z.string({
      required_error: "Confirm Password is required.",
    }),
    first_name: z
      .string({ required_error: "First Name is required." })
      .min(1, { message: "required" }),
    last_name: z
      .string({ required_error: "Last Name is required." })
      .min(1, { message: "required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

export const forgotPasswordFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Please enter a valid email to reset your password." }),
});

export const verifyOtpSchema = z.object({
  reset_token: z
    .string()
    .length(5, { message: "OTP must be exactly 5 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Please enter a valid email to reset your password." }),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Please enter a valid email to reset password." }),
    new_password: z
      .string({ required_error: "New Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Must include at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Must include at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Must include at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Must include at least one special character.",
      }),
    confirm_new_password: z.string({
      required_error: "Confirm Password is required.",
    }),
    reset_token: z
      .string()
      .length(5, { message: "OTP must be exactly 5 digits" })
      .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    path: ["confirm_new_password"],
    message: "Passwords do not match.",
  });



export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
