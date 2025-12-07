"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select";
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
import { getCategoriesDropdown } from "@/lib/api/dropdown/dropdown-api";
import {
  createSubCategory,
  updateSubCategory,
} from "@/lib/api/settings/sub-category-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  subCategorySchema,
  SubCategoryValues,
} from "@/schemas/settings/category-schema";

import { ISubCategory } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SubCategoryFromProps {
  initialData: ISubCategory | null;
}

const SubCategoryForm = ({ initialData }: SubCategoryFromProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<SubCategoryValues>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: initialData
      ? {
        category: initialData.category_id?.toString(),
        name: initialData.name,
        image: initialData.image,
        is_used_to_build_system: initialData.is_used_to_build_system ?? false,
        is_active: initialData.is_active ?? false,
      }
      : {
        category: "",
        name: "",
        image: "",
        is_used_to_build_system: false,
        is_active: false,
      },
  });

  const onSubmit = async (data: SubCategoryValues) => {
    const formData = new FormData;
setLoading(true)
    formData.append("category", data.category)
    formData.append("name", data.name)
    formData.append("is_active", data.is_active.toString())
    formData.append("is_used_to_build_system", data.is_used_to_build_system.toString())
    formData.append('image', data.image)
    try {
      if (initialData) {
        const response = await updateSubCategory(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Sub Category updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.SUB_CATEGORY));
        }
      } else {
        const response = await createSubCategory(formData);
        if (response.status === 201) {
          toast.success("Sub Category created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.SUB_CATEGORY));
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
              title={initialData ? "Edit Sub Category" : "Add Sub Category"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.SUB_CATEGORY}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-sub-category-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CATEGORY</FormLabel>
                    <FormControl>
                      <PaginatedSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder={
                          initialData?.category_name
                            ? initialData.category_name
                            : "Select Category"
                        }
                        fetchData={getCategoriesDropdown}
                        className="w-full"
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
                      SUB-CATEGORY
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the Sub Category."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      IMAGE
                    </FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        value={field.value}
                        onRemove={() => field.onChange(undefined)}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-10">
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
                {/* <FormField
                  control={form.control}
                  name="is_used_to_build_system"
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
                        BUILD YOUR SYSTEM
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-sub-category-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Changes" }
        </Button>
      </div>
    </>
  );
};

export default SubCategoryForm;
