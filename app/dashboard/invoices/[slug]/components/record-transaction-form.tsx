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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

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
} from "@/lib/api/transactions/transaction-api";
import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";
import ButtonLoader from "@/components/common/loader/button-loader";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { getTransectionAmount } from "@/lib/utils";

const paymentModes = [
  {
    id: "cash",
    name: "Cash",
  },
  {
    id: "wallet",
    name: "Wallet",
  },

  {
    id: "banktransfer",
    name: "Bank Transfer",
  },
];

interface TransactionFormProps {
  initialData: any | null;
  invoice?: string;
}

export default function TransactionForm({ initialData, invoice }: TransactionFormProps) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [addTransError, setAddTransError] = useState('')
  const { selectedData } = useAppSelector((state) => state.authentication);

  const payable = selectedData?.status?.toLowerCase() === 'partialpaid' ? getTransectionAmount(selectedData?.transactions, Number(selectedData?.total_amount || selectedData?.amount)) : selectedData?.total_amount || selectedData?.amount

  const title = initialData ? "Edit Transaction" : "Add Transaction";
  const defaultValues = initialData
    ? {
      invoice: selectedData?.invoice_id?.toString() ? selectedData?.invoice_id?.toString() : invoice,
      mode: initialData?.mode,
      amount: initialData?.amount,
      remarks: initialData?.remarks,
    }
    : {
      invoice: selectedData?.invoice_id?.toString() ? selectedData?.invoice_id?.toString() : invoice,
      mode: "",
      amount: payable,
      remarks: "",
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
          dispatch(toggleRefetchTableData());
          toast.success("Transaction has been successfully updated!");
        }
      } else {
        const res = await createTransaction(data);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
          dispatch(toggleRefetchTableData());
          toast.success("Transaction has been successfully created!");
        }
      }
    } catch (error: any) {
      setAddTransError(error?.response?.data?.non_field_errors[0])
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
            name="invoice"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Invoice ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Invoice ID"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value || "")
                    }
                    disabled={selectedData?.id ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mode"
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
                      field.onChange(e.target.value || "")
                    }
                  />
                </FormControl>
                <FormMessage />
                {
                  addTransError &&
                  <span className="text-red-400">{addTransError}</span>
                }
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Remarks</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter Remarks" {...field} />
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
