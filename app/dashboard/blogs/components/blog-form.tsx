"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import TagInput from "@/components/common/form/tag-input";
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
  getProductsDropdown,
  // getUsersDropdown,
} from "@/lib/api/dropdown/dropdown-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { BlogFormValues, blogSchema } from "@/schemas/cms/blogs-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IBlog } from "@/types/cms";
import PaginatedProductSelect from "@/components/common/paginated-select/paginated-product-select";
import useFetchData from "@/hooks/use-fetch";

interface BlogFormProps {
  initialData: IBlog | null;
}

const BlogForm = ({ initialData }: BlogFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isEditMode = Boolean(initialData);
  const title = isEditMode ? "Edit Blog" : "Add Blog";
  const blogUrl = isEditMode ? `/cms/blogs/${initialData?.slug}` : "";
  const { data: blogData, loading: isLoading } = useFetchData<IBlog>(blogUrl);

  const emptyDefaults = {
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
  };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: emptyDefaults,
  });

  useEffect(() => {
    if (isEditMode) {
      const dataToUse = blogData || initialData;

      if (dataToUse) {
        form.reset({
          title: dataToUse.title || "",
          sub_title: dataToUse.sub_title || "",
          author: dataToUse.author || "",
          category: dataToUse.category?.id?.toString() || "",
          tags: dataToUse.tags || "",
          cover_image: dataToUse.cover_image || "",
          description: dataToUse.description || "",
          recommended_products: dataToUse.recommended_products || [],
          is_active: dataToUse.is_active || false,
          send_as_newsletter: dataToUse.send_as_newsletter || false,
        });
      }
    }
  }, [isEditMode, blogData, initialData, form]);

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

      if (data.recommended_products) {
        data.recommended_products.forEach((product) => {
          formData.append("recommended_products", product?.id.toString());
        });
      }

      formData.append("description", data.description);
      formData.append("is_active", data?.is_active?.toString());
      formData.append("send_as_newsletter", data?.send_as_newsletter?.toString());

      if (isEditMode && initialData?.slug) {
        const response = await updateBlog(initialData.slug, formData);
        if (response.status === 200) {
          toast.success("Blog updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/blogs");
        }
      } else if (!isEditMode) {
        const response = await createBlog(formData);
        if (response.status === 201) {
          toast.success("Blog created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/blogs");
        }
      } else {
        toast.error("Cannot update blog: missing slug");
        return;
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  if (isEditMode && isLoading && !blogData) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading blog data...</p>
      </div>
    );
  }

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
                    <FormLabel>TITLE
                      {/* <p className="text-sm text-gray-500 mt-1">
                        ({field.value?.length || 0} out of 100 )
                      </p> */}
                    </FormLabel>
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
                    <FormLabel>SUB-TITLE
                      {/* <p className="text-sm text-gray-500 mt-1">
                        ({field.value?.length || 0} out of 200 )
                      </p> */}
                    </FormLabel>
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
                        <Input placeholder="Enter Author Name..." {...field} />
                        {/* <PaginatedSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select Author"
                          fetchData={getUsersDropdown}
                          className="w-full"
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
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
                /> */}

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
                      <div className="flex items-center justify-between">
                        <FormLabel>Tags</FormLabel>
                        <p className="text-xs text-gray-500">
                          NOTE: Use comma ( , ) to add new tags
                        </p>
                      </div>
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
                        onChange={
                          (value) => {
                            field.onChange(value);
                            form.trigger("description");
                          }
                        }
                        placeholder="Enter the Description"
                        heightClass="!max-h-[250px] h-[250px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-8 md:mt-3">
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
                          fetchData={getProductsDropdown}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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