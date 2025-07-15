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
import { apiSchema, ApiValues } from "@/schemas/settings/api-schema";
import { IApi } from "@/types/Settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

interface ApiFormProps {
  initialData: IApi | null;
}

const ApiForm = ({ initialData }: ApiFormProps) => {
  const form = useForm<ApiValues>({
    resolver: zodResolver(apiSchema),
    defaultValues: initialData
      ? {
          apiName: initialData.api_name,
          apiKey: initialData.api_key
            ? [{ value: initialData.api_key }]
            : [{ value: "" }],
          activate: initialData.is_activated ?? false,
        }
      : {
          apiName: "",
          apiKey: [{ value: "" }],
          activate: false,
        },
  });

  const { fields, append, remove } = useFieldArray<ApiValues, "apiKey">({
    control: form.control,
    name: "apiKey",
  });

  const onSubmit = (data: ApiValues) => {
    console.log("Submitted data:", data);
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title="Add API Keys"
              fallBackLink="/dashboard/settings/sub-category"
            />
          </div>
          <Form {...form}>
            <form
              id="setting-attribute-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="apiName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the name of the API key."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Add Keys</h1>
                <Button
                  type="button"
                  className="text-white"
                  onClick={() => append({ value: "" })}
                >
                  <Plus />
                  Add Key
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`apiKey.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground flex justify-between items-center">
                          API KEY
                          {fields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the API key." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

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
          form="setting-attribute-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ApiForm;
