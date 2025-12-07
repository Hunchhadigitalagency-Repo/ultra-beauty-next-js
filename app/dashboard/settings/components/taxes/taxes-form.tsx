"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
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
import { Switch } from "@/components/ui/switch";
import { createTax, updateTax } from "@/lib/api/settings/tax-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { taxSchema, TaxValues } from "@/schemas/settings/taxes.schema";
import { ITaxes } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TaxesFromProps {
  initialData: ITaxes | null;
}

const TaxesForm = ({ initialData }: TaxesFromProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<TaxValues>({
    resolver: zodResolver(taxSchema),
    defaultValues: initialData
      ? {
        tax_name: initialData.tax_name,
        tax_percentage: initialData.tax_percentage,
        is_active: initialData.is_active ?? false,
      }
      : {
        tax_name: "",
        tax_percentage: "",
        is_active: false,
      },
  });

  const onSubmit = async (data: TaxValues) => {
    setLoading(true)
    try {
      if (initialData) {
        const response = await updateTax(initialData.id, data);
        if (response.status === 200) {
          toast.success("Tax updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting?.(ESettings.TAXES));
        }
      } else {
        const response = await createTax(data);
        if (response.status === 201) {
          toast.success("Tax created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting?.(ESettings.TAXES));
        }
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
            <HeaderBackCard
              title={initialData ? "Edit Taxes" : "Add Taxes"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.TAXES}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-taxes-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="tax_name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      TAX NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the Bill name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax_percentage"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      TAX PERCENTAGE
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={field.value}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(
                            /[^0-9.]/g,
                            ""
                          );
                          const sanitized = onlyNums.replace(
                            /(\..*?)\..*/g,
                            "$1"
                          );
                          field.onChange(sanitized);
                        }}
                        placeholder="Please enter the tax percentage."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="is_active"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="is_active"
                      className="text-muted-foreground"
                    >
                      ACTIVATE
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-taxes-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Changes"}
        </Button>
      </div>
    </>
  );
};

export default TaxesForm;
