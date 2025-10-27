"use client";

import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { updateBill } from "@/lib/api/settings/bill-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { useAppDispatch } from "@/redux/hooks";
import { billSchema, BillValues } from "@/schemas/settings/bill-schema";
import { IBill } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BillFromProps {
  initialData: IBill | null;
}

const BillForm = ({ initialData }: BillFromProps) => {
  const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
  
  const form = useForm<BillValues>({
    resolver: zodResolver(billSchema),
    defaultValues: initialData
      ? {
        billName: initialData?.bill_name,
        companyName: initialData?.name,
        companyAddress: initialData?.address,
        companyLogo: initialData?.logo,
        panNumber: initialData?.pan_number,
        // taxType: initialData?.tax?.id?.toString(),
        activate: initialData?.is_active ?? false,
      }
      : {
        billName: "",
        companyName: "",
        companyAddress: "",
        companyLogo: "",
        panNumber: "",
        // taxType: "",
        activate: false,
      },
  });

  const onSubmit = async (data: BillValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("bill_name", data.billName);
      formData.append("name", data.companyName);
      formData.append("address", data.companyAddress);
      formData.append("pan_number", data.panNumber);
      formData.append("is_active", data?.activate?.toString());

      if (data.companyLogo instanceof File) {
        formData.append("logo", data.companyLogo);
      }

      const response = await updateBill(formData);
      if (response.status === 201) {
        toast.success("Billings updated successfully");
        dispatch(setActiveSetting(ESettings.BILLINGS));
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <h1 className="font-semibold text-xl">Update Bill Detail</h1>
          </div>
          <Form {...form}>
            <form
              id="setting-bill-form"
              onSubmit={form.handleSubmit(onSubmit              )}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-muted-foreground">
                      LOGO
                    </FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        onChange={field.onChange}
                        onRemove={() => field.onChange(undefined)}
                        value={field.value}
                        size="small"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      BILL NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the bill name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the company Name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      ADDRESS
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the address."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="panNumber"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      PAN
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the PAN number."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="taxType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">TAX</FormLabel>

                    <FormControl className="w-full rounded-xs cursor-pointer">
                      <PaginatedSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder={
                          initialData
                            ? initialData?.tax?.tax_name
                            : "Select Category"
                        }
                        fetchData={getTaxesDropdown}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-bill-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> : "Update" }
        </Button>
      </div>
    </>
  );
};

export default BillForm;
