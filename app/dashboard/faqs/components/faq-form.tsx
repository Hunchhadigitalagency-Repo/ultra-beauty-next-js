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
import { Textarea } from "@/components/ui/textarea";
import { createFaq, updateFaq } from "@/lib/api/cms/faq-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { FaqFormValues, faqSchema } from "@/schemas/cms/faq-schema";

import { IFaq } from "@/types/cms";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import PaginatedProductSelect from "@/components/common/paginated-select/paginated-product-select";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";
import useFetchData from "@/hooks/use-fetch";
import { Spinner } from "@/components/ui/spinner";

interface FaqFormProps {
  initialData: IFaq | null;
}

const FaqForm = ({ initialData }: FaqFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit FAQ's" : "Add FAQ's";
  const isEditMode = Boolean(initialData);
  const faqUrl = isEditMode ? `/cms/faqs/${initialData?.slug}` : "";

  const { data: faqs } = useFetchData<IFaq>(faqUrl)

  const emptyDefaults = {
    question: "",
    answer: "",
    page: "",
    is_active: false,
  }
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: emptyDefaults
  });


  useEffect(() => {
    if (isEditMode) {
      const dataToUse = faqs || initialData
      console.log(dataToUse);

      if (dataToUse) {
        form.reset({
          question: dataToUse.question,
          answer: dataToUse.answer,
          type: dataToUse.type,
          is_active: dataToUse?.is_active,
          product: dataToUse?.product,
        })
      }
    }
  }, [initialData, isEditMode, faqs, form])
  const onSubmit = async (data: FaqFormValues) => {
    setLoading(true)
    const payload = {
      ...data,
      product: data.product?.map((item) => item.id.toString()) || [],
    };

    try {
      if (initialData) {
        const response = await updateFaq(Number(initialData.slug), payload as any);
        if (response.status === 200) {
          toast("FAQ's updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/faqs");
        }
      } else {
        const response = await createFaq(payload as any);
        if (response.status === 201) {
          toast("FAQ's created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/faqs");
        }
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false)
    }
  };

  const faqs_type = form.watch('type')
  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard title={title} fallBackLink="/dashboard/faqs" />
          </div>
          <Form {...form}>
            <form
              id="partner-company-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QUESTION</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ANSWER</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter the Answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => {
                  console.log('this is tha', field.value);

                  return (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        Faqs Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select page" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">
                            General
                          </SelectItem>
                          <SelectItem value="product">
                            Product
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              {
                faqs_type?.toLowerCase() === 'product' && (
                  <>
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SELECT PRODUCTS</FormLabel>

                          <FormControl>
                            <PaginatedProductSelect
                              selectedValues={field.value || []}
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
                  </>
                )
              }
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
          form="partner-company-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> : "Save" }
        </Button>
      </div>
    </>
  );
};

export default FaqForm;
