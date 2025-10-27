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
import useFetchData from "@/hooks/use-fetch";

import {
  createPartnerCompany,
  updatePartnerCompany,
} from "@/lib/api/cms/partner-company-api";

import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";

import {
  PartnerCompanyFormValues,
  partnerCompanySchema,
} from "@/schemas/cms/partner-company-schema";
import { IPartnerCompany } from "@/types/cms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PartnerCompanyFormProps {
  initialData: IPartnerCompany | null;
}

const PartnerCompanyForm = ({ initialData }: PartnerCompanyFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const title = initialData ? "Edit Partner Company" : "Add Partner Company";
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(initialData);
  const partnerCompanyUrl = isEditMode ? `/cms/partner-companies/${initialData?.id}` : "";

  const { data: partnerCompney } = useFetchData<IPartnerCompany>(partnerCompanyUrl)

  const emptyDefaults = {
    name: "",
    link: "",
    logo: "",
    is_active: false,
  }

  const form = useForm<PartnerCompanyFormValues>({
    resolver: zodResolver(partnerCompanySchema),
    defaultValues: emptyDefaults
  });

  useEffect(() => {
    if (isEditMode) {
      const dataToUse = partnerCompney || initialData;

      if (dataToUse) {
        form.reset({
          name: dataToUse.name,
          link: dataToUse.link,
          logo: dataToUse.logo,
          is_active: dataToUse.is_active,
        })
      }

    }
  }, [initialData, isEditMode, partnerCompney, form])

  const onSubmit = async (data: PartnerCompanyFormValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("link", data.link);
      if (data.logo instanceof File) {
        formData.append("logo", data.logo);
      }

      formData.append("is_active", data?.is_active?.toString());
      if (initialData) {
        const response = await updatePartnerCompany(initialData.id, formData);
        if (response.status === 200) {
          toast("Partner Company updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/partner-company");
        }
      } else {
        const response = await createPartnerCompany(formData);
        if (response.status === 201) {
          toast("PartnerCompany created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/partner-company");
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
              title={title}
              fallBackLink="/dashboard/partner-company"
            />
          </div>
          <Form {...form}>
            <form
              id="partner-company-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COMPANY NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LINK</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LOGO</FormLabel>
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
          form="partner-company-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> :"Save" }
        </Button>
      </div>
    </>
  );
};

export default PartnerCompanyForm;
