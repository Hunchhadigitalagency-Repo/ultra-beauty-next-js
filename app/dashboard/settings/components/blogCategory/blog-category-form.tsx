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
  createBlogCategory,
  updateBlogCategory,
} from "@/lib/api/settings/blog-category-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  blogCategorySchema,
  BlogCategoryValues,
} from "@/schemas/settings/category-schema";
import { IBlogCategory } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BlogCategoryFormProps {
  initialData: IBlogCategory | null;
}

const BlogCategoryForm = ({ initialData }: BlogCategoryFormProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<BlogCategoryValues>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: initialData
      ? {
          blogCategory: initialData.name,
          is_active: initialData.is_active ?? false,
        }
      : {
          blogCategory: "",
          is_active: false,
        },
  });

  const onSubmit = async (data: BlogCategoryValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.blogCategory);
      formData.append("is_active", data?.is_active?.toString());

      if (initialData) {
        const response = await updateBlogCategory(initialData.id, formData);
        if (response.status === 200) {
          toast("Blog Category updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.BLOG_CATEGORY));
        }
      } else {
        const response = await createBlogCategory(formData);
        if (response.status === 201) {
          toast("Blog Category created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.BLOG_CATEGORY));
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
              title={initialData ? "Edit Blog Category" : "Add Blog Category"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.BLOG_CATEGORY}
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
                name="blogCategory"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      BLOG CATEGORY NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the name of the blog Category."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_active"
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

export default BlogCategoryForm;
