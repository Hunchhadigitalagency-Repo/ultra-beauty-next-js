import { z } from "zod";

export const transactionSchema = z.object({

  amount: z.string().min(1, "Amount is required"),
  invoice_id: z.string().min(1, "Invoice ID is required"),
  payment_mode: z.string().min(1, "Payment Mode is required"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;