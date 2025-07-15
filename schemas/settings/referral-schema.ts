import { z } from "zod";

export const referralSchema = z.object({
 name: z.string().min(1, { message: "Referral name is required." }),
  point_amount: z.coerce
    .number({ required_error: "Please enter the referral point amount." })
    .min(0, { message: "Point amount must be at least 0." }),
  is_active: z.boolean(),
});

export type ReferralValues = z.infer<typeof referralSchema>;
