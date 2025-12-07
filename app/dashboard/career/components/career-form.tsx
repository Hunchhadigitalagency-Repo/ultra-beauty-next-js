"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import useFetchData from "@/hooks/use-fetch-data";
import { createCareer, updateCareer } from "@/lib/api/cms/career-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { CareerFormValues, careerSchema } from "@/schemas/cms/career-schema";
import { ICareer } from "@/types/cms";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CareerFormProps {
  initialData: ICareer | null;
}

const CareerForm = ({ initialData }: CareerFormProps) => {
  const title = initialData ? "Edit Career" : "Add Career";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(initialData);

  const careerUrl = isEditMode ? `/cms/career/${initialData?.slug}` : "";
  const { data: navigationInfo } = useFetchData<ICareer>(careerUrl);

  const emptyDefaults = {
    title: "",
    requirement: "",
    responsibility: "",
    description: "",
    location: "",
    salary: 0,
    position: "",
    job_type: "",
    last_date: "",
    is_active: false,
  }

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: emptyDefaults
    // ? {
    //   title: initialData?.job_title,
    //   requirement: initialData?.job_requirement,
    //   responsibility: initialData?.job_responsibility,
    //   description: initialData?.job_description,
    //   location: initialData?.location,
    //   salary: initialData?.salary || 0,
    //   position: initialData?.position,
    //   job_type: initialData?.job_type,
    //   last_date: initialData?.end_date,
    //   is_active: initialData?.is_active || false,
    // }
    // : {
    //   title: "",
    //   requirement: "",
    //   responsibility: "",
    //   description: "",
    //   location: "",
    //   salary: 0,
    //   position: "",
    //   job_type: "",
    //   last_date: "",
    //   is_active: false,
    // },
  });


  useEffect(() => {
    if (isEditMode) {
      const dataToUse = navigationInfo || initialData;

      if (dataToUse) {
        form.reset({
          title: dataToUse?.job_title,
          requirement: dataToUse?.job_requirement,
          responsibility: dataToUse?.job_responsibility,
          description: dataToUse?.job_description,
          location: dataToUse?.location,
          salary: dataToUse?.salary || 0,
          position: dataToUse?.position,
          job_type: dataToUse?.job_type,
          last_date: dataToUse?.end_date,
          is_active: dataToUse?.is_active || false,
        });
      }
    }
  }, [isEditMode, navigationInfo, initialData, form]);

  const onSubmit = async (data: CareerFormValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("job_title", data.title);
      formData.append("job_description", data.description);
      formData.append("job_requirement", data.requirement);
      formData.append("job_responsibility", data.responsibility);
      formData.append("job_type", data.job_type);
      formData.append("position", data.position);
      formData.append("location", data.location);
      formData.append("end_date", data.last_date);
      formData.append("salary", String(data.salary));
      formData.append("is_active", String(data.is_active));

      if (initialData) {
        const response = await updateCareer(initialData.slug, formData);
        if (response.status === 200) {
          toast.success("Career updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/career");
        }
      } else {
        const response = await createCareer(formData);
        if (response.status === 201) {
          toast.success("Career created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/career");
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
            <HeaderBackCard title={title} fallBackLink="/dashboard/career" />
          </div>
          <Form {...form}>
            <form
              id="newsletter-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JOB TITLE</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Job title" {...field} />
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
                    <FormLabel>JOB DESCRIPTION</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("description");
                        }} placeholder="Please enter the job description "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JOB REQUIREMENT</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("requirement");
                        }} placeholder="Please enter the job requirement "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responsibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JOB RESPONSIBILITY</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("responsibility");
                        }}
                        placeholder="Please enter the job responsibility"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>POSITION</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the name of the position"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LOCATION OF JOB</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LAST DATE OF APPLICATION</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Select last date for application"
                          type="date"
                          {...field}
                          className={field.value ? "" : "!text-xs"}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SALARY</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Please enter the salary for this job"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="job_type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel className="text-muted-foreground">
                        JOB TYPE
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select coupon type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="onsite">On Site</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          form="newsletter-form"
          disabled={loading}
          className="text-white rounded-sm"
        >
         {loading ? <Spinner /> : "Save" }
        </Button>
      </div>
    </>
  );
};

export default CareerForm;
