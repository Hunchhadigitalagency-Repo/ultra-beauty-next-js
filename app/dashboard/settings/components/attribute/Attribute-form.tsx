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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  attributeSchema,
  AttributeValues,
} from "@/schemas/settings/attribute-schema";
import { IAttribute } from "@/types/Settings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAttribute,
  updateAttribute,
} from "@/lib/api/settings/attribute-api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { handleError } from "@/lib/error-handler";
import { ESettings } from "@/types/table";
import { setActiveSetting } from "@/redux/features/setting-slice";

interface AttributeFormProps {
  initialData: IAttribute | null;
}

const AttributeForm = ({ initialData }: AttributeFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<AttributeValues>({
    resolver: zodResolver(attributeSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          type: initialData.type,
          is_active: initialData.is_active ?? false,
          variations:
            initialData.variations?.map((v) => ({
              name: v.name,
              value: v.value,
            })) ?? [],
        }
      : {
          name: "",
          type: "",
          is_active: false,
          variations: [{ name: "", value: "" }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const onSubmit = async (data: AttributeValues) => {
    try {
      if (initialData) {
        const response = await updateAttribute(initialData.id, data);
        if (response.status === 200) {
          toast.success("Attribute updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ATTRIBUTES));
        }
      } else {
        const response = await createAttribute(data);
        if (response.status === 201) {
          toast.success("Attribute created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ATTRIBUTES));
        }
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={initialData ? "Edit Attribute" : "Add Attribute"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.ATTRIBUTES}
            />
          </div>

          <Form {...form}>
            <form
              id="setting-attribute-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        ATTRIBUTE NAME
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please Enter the Name of Attribute"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        ATTRIBUTE TYPE
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Enter the Type of the Attribute" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Checkbox">Checkbox</SelectItem>
                          <SelectItem value="Radio Button">
                            Radio Button
                          </SelectItem>
                          <SelectItem value="Other Button">
                            Other Button
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row text-center justify-between">
                <h4 className="text-lg font-semibold">Attribute Variation</h4>
                <Button
                  type="button"
                  onClick={() => append({ name: "", value: "" })}
                >
                  <Plus /> Add Variation
                </Button>
              </div>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid md:grid-cols-2 gap-4 items-center"
                  >
                    <div className="flex items-center gap-2 ">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className=" hover:text-red-500 pt-5 cursor-pointer"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <FormField
                        control={form.control}
                        name={`variations.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-muted-foreground">
                              VARIATION NAME
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please Enter the Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name={`variations.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">
                              VARIATION VALUE
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please Enter the Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-sm">
                <h1>View Style in frontend</h1>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <h1>{form.watch("name") || "Attribute"}</h1>
                  <div className="flex gap-3">
                    {form.watch("variations")?.map((variation, index) => (
                      <div
                        key={index}
                        className="border border-accent-foreground bg-white px-6 py-1 text-sm"
                      >
                        {variation.name || `Variation ${index + 1}`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4 mt-6">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="is_active"
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="is_active"
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
          className="text-white bg-orange-400 rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default AttributeForm;
