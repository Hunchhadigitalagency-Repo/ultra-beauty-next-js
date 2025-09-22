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
import { Switch } from "@/components/ui/switch";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IFlashSales } from "@/types/flash-sales";
import {
  FlashSalesFormValues,
  flashSalesSchema,
} from "@/schemas/flash-sales/flash-sales-schema";
import {
  createFlashSales,
  updateFlashSales,
} from "@/lib/api/sales/flash-sales-api";
import PaginatedProductSelect from "@/components/common/paginated-select/paginated-product-select";
import useFetchData from "@/hooks/use-fetch";

interface FlashSalesFormProps {
  initialData: IFlashSales | null;
}

const FlashSalesForm = ({ initialData }: FlashSalesFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isEditMode = Boolean(initialData)
  const title = initialData ? "Edit Flash Sales" : "Add Flash Sales";
  const blogUrl = isEditMode ? `/cms/navigation-infos/${initialData?.id}` : "";
  const { data: navigationInfo, } = useFetchData<IFlashSales>(blogUrl);

  const emptyDefaults = {
    name: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    products: [],
    is_active: false,
  };

  const form = useForm<FlashSalesFormValues>({
    resolver: zodResolver(flashSalesSchema),
    defaultValues: emptyDefaults
    // ? {
    //   name: initialData.sales,
    //   discount_percentage: initialData.discount_percentage.toString(),
    //   start_date: new Date(initialData.start_date)
    //     .toISOString()
    //     .slice(0, 16),
    //   end_date: new Date(initialData.end_date).toISOString().slice(0, 16),
    //   products: initialData.products || [],
    //   is_active: initialData.is_active,
    // }
    // : {
    //   name: "",
    //   discount_percentage: "",
    //   start_date: "",
    //   end_date: "",
    //   products: [],
    //   is_active: false,
    // },
  });

  useEffect(() => {
    if (isEditMode) {
      const dataToUse = navigationInfo || initialData;

      if (dataToUse) {
        form.reset({
          name: dataToUse.sales,
          discount_percentage: dataToUse.discount_percentage?.toString() || "",
          start_date: dataToUse.start_date
            ? new Date(dataToUse.start_date).toISOString().slice(0, 16)
            : "",
          end_date: dataToUse.end_date
            ? new Date(dataToUse.end_date).toISOString().slice(0, 16)
            : "",
          products: dataToUse.products || [],
          is_active: dataToUse.is_active ?? false,
        });
      }
    }
  }, [isEditMode, navigationInfo, initialData, form]);


  const onSubmit = async (data: FlashSalesFormValues) => {
    // console.log('ti\hisiis', data);

    try {
      const formData = new FormData();
      formData.append("sales", data.name);
      formData.append("discount_percentage", data.discount_percentage);
      data?.products?.forEach((product) => {
        formData.append("products[]", product?.id.toString());
      });
      formData.append("start_date", data.start_date);
      formData.append("end_date", data?.end_date);
      formData.append("is_active", data?.is_active?.toString());

      if (initialData) {
        const response = await updateFlashSales(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Flash sales updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/flash-sales");
        }
      } else {
        const response = await createFlashSales(formData);
        if (response.status === 201) {
          toast.success("Flash sales created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/flash-sales");
        }
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={title}
              fallBackLink="/dashboard/flash-sales"
            />
          </div>
          <Form {...form}>
            <form
              id="blogs-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SALES NAME</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the name of the sale."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount_percentage"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className=" text-muted-foreground">
                        DISCOUNT PERCENTAGE
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
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>START DATE</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Select Start Duration"
                          type="datetime-local"
                          {...field}
                          className={field.value ? "" : "!text-xs"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End DATE</FormLabel>

                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          className={field.value ? "" : "!text-xs"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem className="m-0 p-0 col-span-2 sm:col-span-1 pb-4">
                    <FormLabel>RECOMMENDED PRODUCTS</FormLabel>
                    <FormControl>
                      <PaginatedProductSelect
                        selectedValues={field.value}
                        onSelectionChange={field.onChange}
                        title="Select Products"
                        fetchData={getProductsDropdown}
                        className="w-full "
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
          form="blogs-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default FlashSalesForm;
