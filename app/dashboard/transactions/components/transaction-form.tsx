"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TransactionFormValues,
  transactionSchema,
} from "@/schemas/menu/transactions/transaction-schema";
import {
  createTransaction,
  updateTransaction,
} from "@/services/transactions/transaction-api";
import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";
import ButtonLoader from "@/components/common/loader/button-loader";

const invoiceIDs = [
  {
    id: 1,
    name: "Invoice ID 1",
  },
  {
    id: 2,
    name: "Invoice ID 2",
  },
];

const paymentModes = [
  {
    id: 1,
    name: "Payment Mode 1",
  },
  {
    id: 2,
    name: "Payment Mode 2",
  },
];

interface TransactionFormProps {
  initialData: any | null;
}

export default function TransactionForm({ initialData }: TransactionFormProps) {
  const dispatch = useAppDispatch();

  console.log(dispatch);

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Transaction" : "Add Transaction";

  const defaultValues = initialData
    ? {
        invoice_id: initialData?.invoice_id?.toString(),
        payment_mode: initialData?.payment_mode,
        amount: initialData?.amount,
      }
    : {
        invoice_id: "",
        payment_mode: "",
        amount: "",
      };

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues,
  });

  const onSubmit = async (data: TransactionFormValues) => {
    setLoading(true);
    try {
      if (initialData) {
        const res = await updateTransaction(initialData.id as number, data);
        if (res.status === 200) {
          document.getElementById("closeDialog")?.click();
          toast.success("Transaction has been successfully updated!");
        }
      } else {
        const res = await createTransaction(data);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
          toast.success("Transaction has been successfully created!");
        }
      }
    } catch (error: any) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-textColor">
          {title}
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="invoice_id"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Invoice ID</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue
                        defaultValue={field.value?.toString()}
                        placeholder="Select Invoice ID"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {invoiceIDs.map((option) => {
                      return (
                        <SelectItem
                          key={option.id}
                          value={option?.id ? option.id.toString() : ""}
                        >
                          {option.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payment_mode"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">PAYMENT MODE</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue
                        defaultValue={field.value?.toString()}
                        placeholder="Select Payment Mode"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentModes.map((option) => {
                      return (
                        <SelectItem
                          key={option.id}
                          value={option?.id ? option.id.toString() : ""}
                        >
                          {option.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Amount"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || "")
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center">
            <Button>
              {loading ? (
                <ButtonLoader />
              ) : (
                <>
                  Save <ChevronRightIcon size={18} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
