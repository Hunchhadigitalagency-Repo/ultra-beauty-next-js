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
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewsletterFormProps {
  initialData: INewsletters | null;
}

const NewsletterForm = ({ initialData }: NewsletterFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const title = initialData ? "Edit Newsletter" : "Add Newsletter";

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          users: [],
          subject_header: "",
          is_active: false,
          is_saved_as_template: false,
        },
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
      console.log(data);
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
                        filterOptions={[
                          { id: "1", name: "Non Buyers" },
                          { id: "2", name: "Buyers" },
                          { id: "3", name: "New Users" },
                          { id: "4", name: "First Users" },
                        ]}
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
                        onChange={field.onChange}
                        placeholder="Enter the blog description "
                      />
                    </FormControl>
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
          form="newsletter-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default NewsletterForm;
