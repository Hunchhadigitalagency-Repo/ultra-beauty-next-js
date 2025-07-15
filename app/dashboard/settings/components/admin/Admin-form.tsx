"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IAdmin } from "@/types/Settings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  adminProfileSchema,
  AdminProfileValues,
} from "@/schemas/settings/admin-schema";
import { Switch } from "@/components/ui/switch";
import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import { toast } from "sonner";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { handleError } from "@/lib/error-handler";
import { useAppDispatch } from "@/redux/hooks";
import { createAdmin, updateAdmin } from "@/lib/api/settings/admin-api";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { ESettings } from "@/types/table";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

interface AdminFromProps {
  initialData: IAdmin | null;
}

const AdminForm = ({ initialData }: AdminFromProps) => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AdminProfileValues>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: initialData
      ? {
          adminName: initialData.name,
          adminAddress: initialData.address,
          adminEmail: initialData.email,
          adminPassword: initialData.password,
          adminProfile: initialData.image_url,
          activate: initialData.is_activated ?? false,
        }
      : {
          adminName: "",
          adminAddress: "",
          adminEmail: "",
          adminPassword: "",
          adminProfile: "",
          activate: false,
        },
  });

  const onSubmit = async (data: AdminProfileValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.adminName);
      formData.append("address", data.adminAddress);
      formData.append("email", data.adminEmail);
      formData.append("password", data.adminPassword);
      formData.append("is_active", data?.activate?.toString());

      if (data.adminProfile instanceof File) {
        formData.append("image", data.adminProfile);
      }

      if (initialData) {
        const response = await updateAdmin(initialData.id, formData);
        if (response.status === 200) {
          toast("Admin updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ADMIN_USERS));
        }
      } else {
        const response = await createAdmin(formData);
        if (response.status === 201) {
          toast("Admin created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ADMIN_USERS));
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
              title={initialData ? "Edit Admin Users" : "Add Admin Users"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.ADMIN_USERS}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-admin-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="adminName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-muted-foreground">
                            NAME
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Please enter the full name."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="adminAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-muted-foreground">
                            ADDRESS
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Please enter the address."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="adminProfile"
                    render={({ field }) => (
                      <FormItem>
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
                </div>
                <div className=" grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="adminEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          EMAIL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="basera@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="adminPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              required
                              type={showPassword ? "text" : "password"}
                              placeholder="Please Enter the Password"
                              {...field}
                              className="rounded-xs"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowPassword((prev: boolean) => !prev)
                              }
                            >
                              {showPassword ? (
                                <FaEyeSlash
                                  className="h-4 w-4 r"
                                  aria-hidden="true"
                                />
                              ) : (
                                <FaEye
                                  className="h-4 w-4 cursor-pointer"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="sr-only">
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="adminPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          PASSWORD
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter the password."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
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
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-admin-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default AdminForm;
