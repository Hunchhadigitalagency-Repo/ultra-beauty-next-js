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
import {
  preferenceSchema,
  PreferenceValues,
} from "@/schemas/settings/preference-schema";
import { IPreference } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface PreferenceFormProps {
  initialData: IPreference | null;
}

const colorKeys = [
  { label: "primary color", color: "primary" },
  { label: "secondary color", color: "secondary" },
  { label: "ternary color", color: "ternary" },
  { label: "forth color", color: "forth" },
  { label: "text primary", color: "textPrimary" },
  { label: "text secondary", color: "textSecondary" },
  { label: "text muted", color: "textMuted" },
  { label: "text paragraph", color: "textParagraph" },
] as const;

const PreferenceForm = ({ initialData }: PreferenceFormProps) => {
  const form = useForm<PreferenceValues>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: initialData
      ? {
          themeName: initialData?.theme_name ?? "",
          activate: initialData?.is_activated ?? false,
          colors: {
            primary: initialData?.colors?.primary ?? "",
            secondary: initialData?.colors?.secondary ?? "",
            ternary: initialData?.colors?.ternary ?? "",
            forth: initialData?.colors?.forth ?? "",
            textPrimary: initialData?.colors?.textPrimary ?? "",
            textSecondary: initialData?.colors?.textSecondary ?? "",
            textMuted: initialData?.colors?.textMuted ?? "",
            textParagraph: initialData?.colors?.textParagraph ?? "",
          },
        }
      : {
          themeName: "",
          colors: {
            primary: "",
            secondary: "",
            ternary: "",
            forth: "",
            textPrimary: "",
            textSecondary: "",
            textMuted: "",
            textParagraph: "",
          },
          activate: false,
        },
  });

  const onSubmit = (data: PreferenceValues) => {
    console.log("Submitted data:", data);
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={initialData ? "Edit Preference" : "Add Preference"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.PREFERENCES}
            />
          </div>

          <Form {...form}>
            <form
              id="setting-preference-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Theme Name */}
              <FormField
                control={form.control}
                name="themeName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground">
                      THEME NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the theme Name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Color Pickers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {colorKeys.map(({ label, color }) => (
                  <FormField
                    key={color}
                    control={form.control}
                    name={`colors.${color}` as const}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-muted-foreground uppercase text-xs">
                            {label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="color"
                              {...field}
                              className="h-10 w-14 border border-input rounded m-0 p-0"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Activate Switch */}
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

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-preference-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default PreferenceForm;
