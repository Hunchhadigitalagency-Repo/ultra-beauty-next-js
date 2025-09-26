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
import { createTermsAndCondition } from "@/lib/api/settings/terms-and-condition";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  termsAndConditionSchema,
  TermsAndConditionValues,
} from "@/schemas/settings/terms-and-condition-schema";
import { ITermsAndCondition } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface HelpAndSupportFormProps {
  initialData: ITermsAndCondition | null;
}

const TermsAndConditionForm = ({ initialData }: HelpAndSupportFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<TermsAndConditionValues>({
    resolver: zodResolver(termsAndConditionSchema),
    defaultValues: initialData
      ? {
        topic: initialData.topic,
        description: initialData.description,
        activate: initialData.is_active ?? false,
      }
      : {
        topic: "",
        description: "",
        activate: false,
      },
  });

  const onSubmit = async (data: TermsAndConditionValues) => {
    try {
      const formData = new FormData();
      formData.append("topic", data.topic);
      formData.append("description", data.description);
      formData.append("is_active", data?.activate?.toString());

      const response = await createTermsAndCondition(formData);
      if (response.status === 201) {
        toast.success("Terms and Condition updated successfully");
        dispatch(toggleRefetchTableData());
        dispatch(setActiveSetting(ESettings.TERMS_AND_CONDITION));
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
              title={
                initialData
                  ? "Edit Terms and Condition"
                  : "Add Terms and Condition"
              }
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.TERMS_AND_CONDITION}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DESCRIPTION</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Please enter the Description"
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

export default TermsAndConditionForm;
