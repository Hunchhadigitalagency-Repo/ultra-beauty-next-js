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
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FaqFormProps {
  initialData: IFaq | null;
}

const FaqForm = ({ initialData }: FaqFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const title = initialData ? "Edit FAQ's" : "Add FAQ's";

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: initialData
      ? initialData
      : {
          question: "",
          answer: "",
          is_active: false,
        },
  });

  const onSubmit = async (data: FaqFormValues) => {
    try {
      if (initialData) {
        const response = await updateFaq(initialData.id, data);
        if (response.status === 200) {
          toast("FAQ's updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/faqs");
        }
      } else {
        const response = await createFaq(data);
        if (response.status === 201) {
          toast("FAQ's created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/faqs");
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
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default FaqForm;
