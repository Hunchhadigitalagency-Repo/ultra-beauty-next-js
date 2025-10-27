import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
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
import {
  createHelpSupport,
  updateHelpSupport,
} from "@/lib/api/settings/help-and-support-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  helpAndSupportSchema,
  HelpAndSupportValues,
} from "@/schemas/settings/help-and-support-schema";
import { IHelpAndSupport } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface HelpAndSupportFormProps {
  initialData: IHelpAndSupport | null;
}

const HelpAndSupportForm = ({ initialData }: HelpAndSupportFormProps) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const form = useForm<HelpAndSupportValues>({
    resolver: zodResolver(helpAndSupportSchema),
    defaultValues: initialData
      ? {
        name: initialData.name,
        description: initialData.description,
        icon: initialData.icon,
        steps: initialData.steps,
        activate: initialData.is_active ?? false,
      }
      : {
        name: "",
        description: "",
        steps: "",
        icon: "",
        activate: false,
      },
  });

  const onSubmit = async (data: HelpAndSupportValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("steps", data.steps);
      formData.append("name", data.name);
      formData.append("is_active", data?.activate?.toString());

      if (data.icon instanceof File) {
        formData.append("icon", data.icon);
      }

      if (initialData) {
        const response = await updateHelpSupport(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Help and Support updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.HELP_AND_SUPPORT));
        }
      } else {
        const response = await createHelpSupport(formData);
        if (response.status === 201) {
          toast.success("Help and Support created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.HELP_AND_SUPPORT));
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
              title={
                initialData ? "Edit Help and Support" : "Add Help and Support"
              }
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
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-muted-foreground">
                      ICON
                    </FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        onChange={field.onChange}
                        onRemove={() => field.onChange(undefined)}
                        value={field.value}
                        size="small"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the name of the problem."
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
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the description."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="steps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ADD STEPS</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter the Description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="activate"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="activate"
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
          form="setting-social-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
         {loading ? <Spinner />  : "Save" }
        </Button>
      </div>
    </>
  );
};

export default HelpAndSupportForm;
