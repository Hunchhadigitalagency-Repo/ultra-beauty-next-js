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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createBanner, updateBanner } from "@/lib/api/cms/banner-api";
import { handleError } from "@/lib/error-handler";
import { BannerFormValues, bannerSchema } from "@/schemas/cms/banner-schema";
import { IBanner } from "@/types/banner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BannerFromProps {
  initialData: IBanner | null;
}

const BannerForm = ({ initialData }: BannerFromProps) => {
  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),

    defaultValues: initialData
      ? {
          banner_type: initialData.banner_type,
          title: initialData.title,
          subtitle: initialData.subtitle || "",
          product: initialData.product || "",
          image: initialData.image || "",
          discount_percentage: initialData.discount_percentage || 0,
          expiry_datetime: initialData.expiry_datetime || "",
          categories: initialData.category ? [initialData.category] : undefined,
          subcategories: initialData.sub_category
            ? [initialData.sub_category]
            : undefined,
          is_active: initialData.is_active ?? false,
        }
      : {
          banner_type: "GENERAL",
          title: "",
          subtitle: "",
          product: "",
          image: "",
          discount_percentage: 0,
          expiry_datetime: "",
          categories: undefined,
          subcategories: undefined,
          is_active: false,
        },
  });

  const onSubmit = async (data: BannerFormValues) => {
    try {
      const formData = new FormData();
      formData.append("banner_type", data.banner_type);
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("product", data.product);
      formData.append("is_active", data?.is_active?.toString());

      if (data.image instanceof File) {
        formData.append("category_image", data.image);
      }

      if (initialData) {
        const response = await updateBanner(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Banner updated successfully");
          form.reset(data);
        }
      } else {
        const response = await createBanner(formData);
        if (response.status === 201) {
          toast.success("Banner created successfully");
          form.reset();
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
              title={initialData ? "Edit Banner" : "Add Banner"}
              fallBackLink="/dashboard/banners"
            />
          </div>
          <Form {...form}>
            <form
              id="setting-brand-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="banner_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      Banner Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Select banner type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GENERAL">General Banner</SelectItem>
                        <SelectItem value="DISCOUNT">
                          Discount Category Banner
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("banner_type") === "GENERAL" && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className=" text-muted-foreground">
                          TITLE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the title of the banner."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className=" text-muted-foreground">
                          SUb TITLE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the sub title of the banner."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className=" text-muted-foreground">
                          PRODUCT
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the name of the product."
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
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          IMAGE
                        </FormLabel>
                        <FormControl>
                          <SingleImageUploader
                            onChange={field.onChange}
                            onRemove={() => field.onChange(undefined)}
                            value={field.value}
                            size="small"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {form.watch("banner_type") === "DISCOUNT" && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className=" text-muted-foreground">
                          TITLE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the title of the banner."
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
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          IMAGE
                        </FormLabel>
                        <FormControl>
                          <SingleImageUploader
                            onChange={field.onChange}
                            onRemove={() => field.onChange(undefined)}
                            value={field.value}
                            size="small"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="discount_percentage"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className=" text-muted-foreground">
                            DISCOUNT PERCENTAGE
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="decimal"
                              value={field.value}
                              onChange={(e) => {
                                const onlyNums = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ""
                                );
                                const sanitized = onlyNums.replace(
                                  /(\..*?)\..*/g,
                                  "$0"
                                );
                                field.onChange(sanitized);
                              }}
                              placeholder="Please enter the discount percentage."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expiry_datetime"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-muted-foreground">
                            EXPIRY DATE & TIME
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="datetime-local"
                              {...field}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

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
          form="setting-brand-form"
          className="text-white rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default BannerForm;
