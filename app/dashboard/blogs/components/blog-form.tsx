"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import TagInput from "@/components/common/form/tag-input";
import { PaginatedProductSelect } from "@/components/common/paginated-select/paginated-product-select";
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select";
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
import { Switch } from "@/components/ui/switch";
import { createBlog, updateBlog } from "@/lib/api/cms/blogs-api";
import {
  getBlogCategories,
  getUsersDropdown,
} from "@/lib/api/dropdown/dropdown-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { BlogFormValues, blogSchema } from "@/schemas/cms/blogs-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BlogFormProps {
  initialData: any | null;
}

const BlogForm = ({ initialData }: BlogFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const title = initialData ? "Edit Blog" : "Add Blog";

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          sub_title: "",
          author: "",
          category: "",
          tags: "",
          cover_image: "",
          description: "",
          recommended_products: [],
          is_active: false,
          send_as_newsletter: false,
        },
  });

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("sub_title", data.sub_title);
      formData.append("author", data.author);
      formData.append("category", data?.category || "");
      formData.append("tags", data.tags);
      if (data.cover_image instanceof File) {
        formData.append("cover_image", data.cover_image);
      }

      formData.append("description", data.description);
      formData.append("is_active", data?.is_active?.toString());
      formData.append(
        "send_as_newsletter",
        data?.send_as_newsletter?.toString()
      );
      if (initialData) {
        const response = await updateBlog(initialData.id, formData);
        if (response.status === 200) {
          toast("Blog updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/blogs");
        }
      } else {
        const response = await createBlog(formData);
        if (response.status === 201) {
          toast("Blog created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/blogs");
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
            <HeaderBackCard title={title} fallBackLink="/dashboard/blogs" />
          </div>
          <Form {...form}>
            <form
              id="blogs-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TITLE</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sub_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SUB-TITLE</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AUTHOR</FormLabel>
                      <FormControl>
                        <PaginatedSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select Author"
                          fetchData={getUsersDropdown}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          placeholder="Select Category"
                          fetchData={getBlogCategories}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TAGS </FormLabel>
                      <FormControl>
                        <TagInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter tags separated by commas or enter"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-muted-foreground">
                      COVER IMAGE
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DESCRIPTION</FormLabel>
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
                name="recommended_products"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RECOMMENDED PRODUCTS</FormLabel>
                    <FormControl>
                      <PaginatedProductSelect
                        selectedValues={field.value}
                        onSelectionChange={field.onChange}
                        title="Select Products"
                        fetchData={getUsersDropdown}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
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

                <FormField
                  control={form.control}
                  name="send_as_newsletter"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4 mt-6">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="send_as_newsletter"
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="send_as_newsletter"
                        className="text-muted-foreground"
                      >
                        SEND AS NEWSLETTER
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
          form="blogs-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default BlogForm;
