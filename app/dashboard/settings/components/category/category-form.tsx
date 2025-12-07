"use client";

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
  createCategory,
  updateCategory,
} from "@/lib/api/settings/category-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  categorySchema,
  CategoryValues,
} from "@/schemas/settings/category-schema";
import { ICategory } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryFormProps {
  initialData: ICategory | null;
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Category" : "Add Category";

  const form = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
      ? {
        categoryName: initialData.name,
        categoryImage: initialData.icon ?? "",
        activate: initialData.is_active ?? false,
        is_featured: initialData.is_featured ?? false,
      }
      : {
        categoryName: "",
        categoryImage: "",
        activate: false,
        is_featured: false,
      },
  });

  const onSubmit = async (data: CategoryValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", data.categoryName);
      if (data.categoryImage instanceof File) {
        formData.append("icon", data.categoryImage);
      }

      formData.append("is_active", data?.activate?.toString());
      formData.append("is_featured", data?.is_featured?.toString());

      if (initialData) {
        const response = await updateCategory(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Category updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.CATEGORY));
        }
      } else {
        const response = await createCategory(formData);
        if (response.status === 201) {
          toast.success("Category created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.CATEGORY));
        }
      }
    } catch (error) {
      handleError(error, toast);
    } finally{
      setLoading(false)
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={title}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.CATEGORY}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-category-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="categoryImage"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className=" text-muted-foreground">
                      CATEGORY IMAGE
                    </FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center hover:border-purple-500 transition-colors duration-300">
                        <SingleImageUploader
                          onChange={field.onChange}
                          onRemove={() => field.onChange(undefined)}
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                    <span className="text-xs text-gray-400 mt-1 block">
                      NOTE: Please upload 500 x 500 px size
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      CATEGORY NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the name of the Category."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-5">

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

                <FormField
                  control={form.control}
                  name="is_featured"
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
                        IS FEATURED
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-category-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> : "Save Changes" }
        </Button>
      </div>
    </>
  );
};

export default CategoryForm;
