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


import { createSms, updateSms } from "@/lib/api/cms/sms-api";
import { getUsersDropdown } from "@/lib/api/dropdown/dropdown-api";

import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { SmsFormValues, smsSchema } from "@/schemas/cms/sms-schema";
import { ISms } from "@/types/cms";


import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SmsFormProps {
  initialData: ISms | null;
}

const SmsForm = ({ initialData }: SmsFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const title = initialData ? "Edit Sms" : "Add Sms";

  const form = useForm<SmsFormValues>({
    resolver: zodResolver(smsSchema),
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

  const onSubmit = async (data: SmsFormValues) => {
    try {
      console.log(data);
      if (initialData) {
        const response = await updateSms(initialData.id, data);
        if (response.status === 200) {
          toast.success("Sms updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/sms");
        }
      } else {
        const response = await createSms(data);
        if (response.status === 201) {
          toast.success("Sms created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/sms");
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
              fallBackLink="/dashboard/sms"
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

export default SmsForm;
