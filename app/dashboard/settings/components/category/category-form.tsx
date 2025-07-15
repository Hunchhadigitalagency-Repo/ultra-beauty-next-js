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

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryFormProps {
  initialData: ICategory | null;
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const dispatch = useAppDispatch();

  const title = initialData ? "Edit Category" : "Add Category";

  const form = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
      ? {
          categoryName: initialData.name,
          categoryImage: initialData.icon ?? "",
          activate: initialData.is_active ?? false,
        }
      : {
          categoryName: "",
          categoryImage: "",
          activate: false,
        },
  });

  const onSubmit = async (data: CategoryValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.categoryName);
      formData.append("icon", data.categoryImage);
      formData.append("is_active", data?.activate?.toString());

      if (data.categoryImage instanceof File) {
        formData.append("category_image", data.categoryImage);
      }

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
                  <FormItem>
                    <FormLabel className=" text-muted-foreground">
                      CATEGORY IMAGE
                    </FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        onChange={field.onChange}
                        onRemove={() => field.onChange(undefined)}
                        value={field.value}
                      />
                    </FormControl>
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
          form="setting-category-form"
          className="text-white rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default CategoryForm;
