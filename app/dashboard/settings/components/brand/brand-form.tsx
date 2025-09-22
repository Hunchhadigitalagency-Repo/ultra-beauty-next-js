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
import { createBrand, updateBrand } from "@/lib/api/settings/brand-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { brandSchema, BrandValues } from "@/schemas/settings/brand-schema";
import { IBrand } from "@/types/Settings";
import { ESettings, ETypes } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BrandFromProps {
  initialData: IBrand | null;
}

const BrandForm = ({ initialData }: BrandFromProps) => {
  const dispatch = useAppDispatch();

  const form = useForm<BrandValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialData
      ? {
        brandName: initialData.brand_name,
        brandImage: initialData.brand_image,
        activate: initialData.is_active ?? false,
      }
      : {
        brandName: "",
        brandImage: "",
        activate: false,
      },
  });

  const onSubmit = async (data: BrandValues) => {
    try {
      const formData = new FormData();
      formData.append("brand_name", data.brandName);
      formData.append("is_active", data?.activate?.toString());

      if (data.brandImage instanceof File) {
        formData.append("brand_image", data.brandImage);
      }

      if (initialData) {
        const response = await updateBrand(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Brand updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.BRAND));
        }
      } else {
        const response = await createBrand(formData);
        if (response.status === 201) {
          toast.success("Brand created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.BRAND));
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
              title={initialData ? "Edit Brand" : "Add Brand"}
              fallBackLink="/dashboard/settings"
              settingValue={ETypes.BRAND}
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
                name="brandName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      BRAND NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the brand name."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brandImage"
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
                    <span className="text-xs text-gray-400 mt-1 block">
                      NOTE: Please upload 500 x 500 px size
                    </span>
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
          form="setting-brand-form"
          className="text-white rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default BrandForm;
