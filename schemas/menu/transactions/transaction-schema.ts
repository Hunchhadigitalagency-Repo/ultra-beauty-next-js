import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  invoice: z.string().min(1, "Invoice ID is required"),
  mode: z.string().min(1, "Payment Mode is required"),
  remarks: z.string().min(1, "Remarks is required"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
