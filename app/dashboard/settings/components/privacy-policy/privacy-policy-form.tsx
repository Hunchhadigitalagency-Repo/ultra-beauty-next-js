import HeaderBackCard from "@/components/common/cards/header-back-card";
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
import { createPrivacyPolicy } from "@/lib/api/settings/privacy-policy-api";
import { formatDateForInput } from "@/lib/date-time-utils";
import { handleError } from "@/lib/error-handler";
import {
  privacyPolicySchema,
  PrivacyPolicyValues,
} from "@/schemas/settings/privacy-policy-schema";
import { IPrivacyPolicy } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface HelpAndSupportFormProps {
  initialData: IPrivacyPolicy | null;
}

const PrivacyPolicyForm = ({ initialData }: HelpAndSupportFormProps) => {
  const form = useForm<PrivacyPolicyValues>({
    resolver: zodResolver(privacyPolicySchema),
    defaultValues: initialData
      ? {
        topic: initialData.topic,
        effective_date: formatDateForInput(
          new Date(initialData.effective_date)
        ),
        description: initialData.description,
        activate: initialData.is_active ?? false,
      }
      : {
        topic: "",
        effective_date: "",
        description: "",
        activate: false,
      },
  });

  const onSubmit = async (data: PrivacyPolicyValues) => {
    try {
      const formData = new FormData();
      formData.append("topic", data.topic);
      formData.append("effective_date", data.effective_date);
      formData.append("description", data.description);
      formData.append("is_active", data?.activate?.toString());

      const response = await createPrivacyPolicy(formData);
      if (response.status === 201 || response.status === 200) {
        toast.success("Privacy Policy updated successfully");
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={initialData ? "Edit Privacy Policy" : "Add Privacy Policy"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.HELP_AND_SUPPORT}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-social-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      TOPIC
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the topic for privacy and policy."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="effective_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EFFECTIVE DATE</FormLabel>

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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DESCRIPTION</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Please enter the Description"
                        className="!h-full"
                        heightClass="!h-[250px] !min-h-[250px] !max-h-250px]"
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
          form="setting-social-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default PrivacyPolicyForm;
