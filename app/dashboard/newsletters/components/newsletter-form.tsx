"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import { PaginatedMultiSelect } from "@/components/common/paginated-select/paginated-multi-select";
import RichTextEditor from "@/components/common/text-editor/text-editor";
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
import useFetchData from "@/hooks/use-fetch";

import {
  createNewsletter,
  updateNewsletter,
} from "@/lib/api/cms/newsletter-api";
import { getUsersDropdown } from "@/lib/api/dropdown/dropdown-api";

import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  NewsletterFormValues,
  newsletterSchema,
} from "@/schemas/cms/newsletter-schema";
import { INewsletters } from "@/types/cms";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewsletterFormProps {
  initialData: INewsletters | null;
}

const NewsletterForm = ({ initialData }: NewsletterFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Newsletter" : "Add Newsletter";
  const isEditMode = Boolean(initialData);
  const newsLetterUrl = isEditMode ? `/cms/newsletters/${initialData?.id}` : "";
  const { data: newsLetter, } = useFetchData<INewsletters>(newsLetterUrl);

  const emptyDefaults = {
    title: "",
    users: [],
    subject_header: "",
    is_active: false,
    is_saved_as_template: false,
  }

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: emptyDefaults
  });


  useEffect(() => {
    if (isEditMode) {
      const dataToUse = newsLetter || initialData;

      if (dataToUse) {
        form.reset({
          title: newsLetter?.title,
          users: newsLetter?.users,
          subject_header: newsLetter?.subject_header,
          is_active: newsLetter?.is_active,
          is_saved_as_template: newsLetter?.is_saved_as_template,
        });
      }
    }
  }, [isEditMode, newsLetter, initialData, form]);

  const onSubmit = async (data: NewsletterFormValues) => {
    setLoading(true)
    try {
      if (initialData) {
        const response = await updateNewsletter(initialData.id, data);
        if (response.status === 200) {
          toast.success("Newsletter updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/newsletters");
        }
      } else {
        const response = await createNewsletter(data);
        if (response.status === 201) {
          toast.success("Newsletter created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/newsletters");
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
              title={title}
              fallBackLink="/dashboard/newsletters"
            />
          </div>
          <Form {...form}>
            <form
              id="newsletter-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TITLE</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>USERS</FormLabel>
                    <FormControl>
                      <PaginatedMultiSelect
                        selectedValues={field.value}
                        onSelectionChange={field.onChange}
                        placeholder="Select Users"
                        fetchData={getUsersDropdown}
                        className="w-full"

                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject_header"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SUBJECT HEADER</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the header" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MESSAGE</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value)
                          form.trigger("message")
                        }}
                        placeholder="Enter the blog description "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
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

                <FormField
                  control={form.control}
                  name="is_saved_as_template"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 mt-6">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="is_saved_as_template"
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="is_saved_as_template"
                        className="text-muted-foreground"
                      >
                        SAVE AS TEMPLATE
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="newsletter-form"
          disabled={loading}
          className="text-white rounded-sm"
        >
          {loading? <Spinner /> : "Save" }
        </Button>
      </div>
    </>
  );
};

export default NewsletterForm;
