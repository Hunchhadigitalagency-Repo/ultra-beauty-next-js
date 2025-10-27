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
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  createPreferences,
  updatePreferences,
} from "@/lib/api/settings/preferences-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  preferenceSchema,
  PreferenceValues,
} from "@/schemas/settings/preference-schema";
import { IPreference } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<PreferenceValues>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: initialData
      ? {
        themeName: initialData?.theme_name ?? "",
        activate: initialData?.is_active,
        colors: colorKeys.reduce((acc, { color }) => {
          const colorObj = initialData?.colors?.find(
            (c) => c.color_name === color
          );
          acc[color] = colorObj?.color_value ?? "";
          return acc;
        }, {} as PreferenceValues["colors"]),
      }
      : {
        themeName: "",
        activate: false,
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
      },
  });

  const onSubmit = async (data: PreferenceValues) => {
    setLoading(true)
    try {
      let transformedColors;

      if (data.colors && Object.keys(data.colors).length > 0) {
        transformedColors = Object.entries(data.colors).map(
          ([color_name, color_value]) => ({
            color_name,
            color_value,
          })
        );
      }

      const payload = {
        theme_name: data.themeName,
        is_active: data.activate,
        colors: transformedColors || [],
      };

      if (initialData) {
        const response = await updatePreferences(initialData.id, payload);
        if (response.status === 200) {
          toast.success("Preferences updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.PREFERENCES));
        }
      } else {
        const response = await createPreferences(payload);
        if (response.status === 201) {
          toast.success("Preferences created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.PREFERENCES));
        }
      }
    } catch (error) {
      console.error(error);
      handleError(error, toast);
    } finally {
      setLoading(false)
    }
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
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save"}
        </Button>
      </div>
    </>
  );
};

export default PreferenceForm;
