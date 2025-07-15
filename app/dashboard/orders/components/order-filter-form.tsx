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

export default function OrderFilterForm() {
  const form = useForm<OrderFilterValues>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: "",
      status: "",
      grandTotal: "",
      customerName: "",
      email: "",
      dateRange: "",
    },
  });

  function onSubmit(values: OrderFilterValues) {
    console.log("Apply Filter:", values);
    // Handle filter application logic here
  }

  function onClear() {
    form.reset();
    console.log("Filters cleared");
    // Handle clear filter logic here
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  placeholder="Enter the grand total"
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

        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                DATE RANGE FILTER
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the date range"
                  className="border-gray-200 focus:border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
