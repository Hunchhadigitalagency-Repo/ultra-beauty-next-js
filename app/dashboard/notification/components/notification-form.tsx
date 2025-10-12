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
import { Textarea } from "@/components/ui/textarea";
import {
  createNotification,
  updateNotification,
} from "@/lib/api/cms/notification-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  NotificationFormValues,
  notificationSchema,
} from "@/schemas/cms/notification-schema";
import { INotification } from "@/types/cms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NotificationFormProps {
  initialData: INotification | null;
}

const NotificationForm = ({ initialData }: NotificationFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const title = initialData ? "Edit Notification" : "Add Notification";

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          link: "",
        },
  });

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      if (initialData) {
        const response = await updateNotification(initialData.id, data);
        if (response.status === 200) {
          toast.success("Notification updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/notification");
        }
      } else {
        const response = await createNotification(data);
        if (response.status === 201) {
          toast.success("Notification created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/notification");
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
              fallBackLink="/dashboard/notification"
            />
          </div>
          <Form {...form}>
            <form
              id="notifications-form"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DESCRIPTION</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LINK</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the link" {...field} />
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
          form="notifications-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default NotificationForm;
