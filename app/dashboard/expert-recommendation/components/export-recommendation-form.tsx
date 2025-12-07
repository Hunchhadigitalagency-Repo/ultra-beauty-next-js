"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import PaginatedProductSelect from "@/components/common/paginated-select/paginated-product-select";

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
import { Textarea } from "@/components/ui/textarea";
import {
  createExpertRecommendation,
  updateExpertRecommendation,
} from "@/lib/api/cms/expert-recommendation-api";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";
import { handleError } from "@/lib/error-handler";
import {
  ExpertRecommendationFormValues,
  expertRecommendationSchema,
} from "@/schemas/cms/expert-recommendation-schema";
import { IExpertRecommendation } from "@/types/cms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ExpertRecommendationFromProps {
  initialData: IExpertRecommendation | null;
}

const ExpertRecommendationForm = ({
  initialData,
}: ExpertRecommendationFromProps) => {
  const title = initialData
    ? "Edit Expert Recommendation"
    : "Add Expert Recommendation";
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ExpertRecommendationFormValues>({
    resolver: zodResolver(expertRecommendationSchema),
    defaultValues: initialData
      ? {
        name: initialData.name,
        designation: initialData.designation,
        company: initialData.company,
        message: initialData.message,
        photo: initialData.photo,
        products: initialData.products || [],
        is_active: initialData.is_active,
      }
      : {
        name: "",
        designation: "",
        company: "",
        message: "",
        photo: "",
        products: [],
        is_active: false,
      },
  });

  const onSubmit = async (data: ExpertRecommendationFormValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("company", data.company);
      formData.append("message", data.message);

      data?.products?.forEach((product) => {
        formData.append("products", product?.id?.toString());
      });

      if (data.photo instanceof File) {
        formData.append("photo", data.photo);
      }

      formData.append("is_active", data?.is_active?.toString());

      if (initialData) {
        const response = await updateExpertRecommendation(
          initialData.id,
          formData
        );
        if (response.status === 200) {
          toast.success("Expert recommendation updated successfully");
          router.push("/dashboard/expert-recommendation");
        }
      } else {
        const response = await createExpertRecommendation(formData);
        if (response.status === 201) {
          toast.success("Expert recommendation created successfully");
          router.push("/dashboard/expert-recommendation");
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
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={title}
              fallBackLink="/dashboard/expert-recommendation"
            />
          </div>

          <Form {...form}>
            <form
              id="expert-recommendation-form"
              onSubmit={form.handleSubmit(onSubmit, err => console.log("error", err))}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        NAME
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the expert's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        DESIGNATION
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter designation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        COMPANY
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="products"
                render={({ field }) => {
                  console.log("field value", field.value)
                  return (
                    <FormItem className="m-0 p-0 col-span-2 sm:col-span-1 pb-4">
                      <FormLabel>PRODUCTS</FormLabel>
                      <FormControl>
                        <PaginatedProductSelect
                          selectedValues={field.value}
                          onSelectionChange={field.onChange}
                          title="Select Products"
                          fetchData={getProductsDropdown}
                          className="w-full "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-muted-foreground">
                      MESSAGE
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={8}
                        placeholder="Enter your message here..."
                        className="rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-muted-foreground">
                      BRAND IMAGE
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

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
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
          form="expert-recommendation-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> : "Save" }
        </Button>
      </div>
    </>
  );
};

export default ExpertRecommendationForm;
