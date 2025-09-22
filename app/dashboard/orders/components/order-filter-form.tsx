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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  orderFilterSchema,
  OrderFilterValues,
} from "@/schemas/settings/order-schema";
import { SheetClose } from "@/components/ui/sheet";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { format, } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCriteria } from "@/redux/features/filter-slice";

export default function OrderFilterForm() {
  const dispatch = useAppDispatch();
  const { criteria } = useAppSelector((state) => state.filter);
  const { orderStatusDropdown } = useAppSelector((state) => state.dropdown);

  const form = useForm<OrderFilterValues>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: "",
      status: "",
      grandTotal: undefined,
      customerName: "",
      email: "",
      start_date: "",
      end_date: "",
    },
  });

  function onSubmit(values: OrderFilterValues) {
    dispatch(
      setCriteria({
        ...criteria,
        order_id: values.orderId,
        order_status: values.status,
        customer_name: values.customerName,
        // grand_total: values.grandTotal ?? "0",
        email: values.email,
        start_date: values.start_date,
        end_date: values.end_date,
      })
    );
  }

  function onClear() {
    form.reset();
    dispatch(setCriteria({}))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="orderId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                ORDER ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the order ID"
                  className="border-gray-200 focus:border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                STATUS
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-200 focus:border-gray-300">
                    <SelectValue placeholder="Enter the status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orderStatusDropdown?.map((status) => (
                    <SelectItem key={status.id} value={status.id?.toString()}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grandTotal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                GRAND TOTAL
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the grand total"
                  className="border-gray-200 focus:border-gray-300"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                CUSTOMER NAME
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the customer name"
                  className="border-gray-200 focus:border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                EMAIL
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter the email address"
                  className="border-gray-200 focus:border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            DATE RANGE FILTER
          </FormLabel>
          <FormControl>
            <DateRangePicker
              onUpdate={(values) => {
                form.setValue(
                  "start_date",
                  values.range?.from
                    ? format(values.range.from, "yyyy-MM-dd")
                    : ""
                );
                form.setValue(
                  "end_date",
                  values.range?.to ? format(values.range.to, "yyyy-MM-dd") : ""
                );
              }}
              initialDateFrom={form.getValues("start_date") || "2024-01-01"}
              initialDateTo={form.getValues("end_date") || new Date()}
              align="start"
              locale="en-GB"
              showCompare={false}
            />
          </FormControl>
        </FormItem>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClear}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
          >
            Clear Filter
          </Button>
          <SheetClose asChild>
            <Button
              type="submit"
              className="flex-1 bg-yellow hover:bg-yellow-600 text-white"
            >
              Apply Filter
            </Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
}
