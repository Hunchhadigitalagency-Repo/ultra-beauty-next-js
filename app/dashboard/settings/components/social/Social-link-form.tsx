import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";

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
  createSocialLink,
  updateSocialLink,
} from "@/lib/api/settings/social-links-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { socialSchema, SocialValues } from "@/schemas/settings/social-schema";
import { ISocial } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SocialFromProps {
  initialData: ISocial | null;
}

const SocialForm = ({ initialData }: SocialFromProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<SocialValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: initialData
      ? {
          socialName: initialData.name,
          socialUrl: initialData.url,
          socialIcon: initialData.icon,
          activate: initialData.is_active ?? false,
        }
      : {
          socialName: "",
          socialUrl: "",
          socialIcon: "",
          activate: false,
        },
  });

  const onSubmit = async (data: SocialValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("url", data.socialUrl);
      formData.append("name", data.socialName);
      formData.append("is_active", data?.activate?.toString());

      if (data.socialIcon instanceof File) {
        formData.append("icon", data.socialIcon);
      }

      if (initialData) {
        const response = await updateSocialLink(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Social Link updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.SOCIAL_LINKS));
        }
      } else {
        const response = await createSocialLink(formData);
        if (response.status === 201) {
          toast.success("Social Link created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.SOCIAL_LINKS));
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
              title={initialData ? "Edit Social Links" : "Add Social Links"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.SOCIAL_LINKS}
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
                name="socialIcon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-muted-foreground">
                      LOGO
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
                name="socialName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of the social Media."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialUrl"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the url of the social media."
                        {...field}
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
          {loading? <Spinner /> : "Save"}
        </Button>
      </div>
    </>
  );
};

export default SocialForm;
