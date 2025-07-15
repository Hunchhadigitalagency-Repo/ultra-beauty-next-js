"use client";
import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import { StarRating } from "@/components/common/form/star-rating-input";
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
import { Textarea } from "@/components/ui/textarea";
import {
  createTestimonials,
  updateTestimonials,
} from "@/lib/api/cms/testimonials-api";
import { handleError } from "@/lib/error-handler";
import {
  TestimonialFormValues,
  testimonialSchema,
} from "@/schemas/cms/testimonials-schema";
import { ITestimonial } from "@/types/cms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import type React from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TestimonialFormProps {
  initialData: ITestimonial | null;
}

const TestimonialForm = ({ initialData }: TestimonialFormProps) => {
  const router = useRouter();
  const title = initialData ? "Edit Testimonial" : "Add Testimonial";

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || {
      name: "",
      company: "",
      designation: "",
      message: "",
      image: "",
      rating: 0,
      is_active: false,
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("designation", data.designation);
      formData.append("company", data.company);
      formData.append("message", data.message);
      formData.append("is_active", data.is_active.toString());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      formData.append("rating", data.rating.toString());
      if (initialData) {
        const response = await updateTestimonials(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Testimonial updated successfully");
          router.push("/dashboard/testimonials");
        }
      } else {
        const response = await createTestimonials(formData);
        if (response.status === 201) {
          toast.success("Testimonial created successfully");
          router.push("/dashboard/testimonials");
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
              title={title}
              fallBackLink="/dashboard/testimonials"
            />
          </div>

          <Form {...form}>
            <form
              id="testimonial-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAME</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DESIGNATION</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COMPANY</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MESSAGE</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the testimonial message"
                        className="min-h-[120px] resize-none"
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
                    <FormLabel>IMAGE</FormLabel>
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RATING</FormLabel>
                    <FormControl>
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
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
          form="testimonial-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default TestimonialForm;
