"use client";

import React, { useEffect, useMemo } from "react";
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
import { rolesSchema, RolesValues } from "@/schemas/settings/roles-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  getAllEntities,
  mapRolesDataToForm,
} from "@/lib/roles-permissions-utils";
import { permissionsData } from "@/constants/permissions-data";
import { Checkbox } from "@/components/ui/checkbox";
import { IRolesPermissions } from "@/types/roles-permissions";
import { ESettings } from "@/types/table";
import { PaginatedMultiSelect } from "@/components/common/paginated-select/paginated-multi-select";
import { getUsersDropdown } from "@/lib/api/dropdown/dropdown-api";
import {
  createRolesandPermissions,
  updateRolesandPermissions,
} from "@/lib/api/settings/roles-permissions-api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RolesFormProps {
  initialData: IRolesPermissions | null;
}

const RolesForm = ({ initialData }: RolesFormProps) => {


  const dispatch = useAppDispatch();

  const flattenedConfig = getAllEntities(permissionsData);

  const emptyDefaults = useMemo(() => {
    return {
      role_name: "",
      users: [],
      entities: flattenedConfig.reduce((acc, entity) => {
        acc[entity.data] = entity.permissions.reduce(
          (permissionAcc, permission) => {
            permissionAcc[permission] = false;
            return permissionAcc;
          },
          {} as Record<string, boolean>
        );
        return acc;
      }, {} as RolesValues["entities"]),
      is_active: false,
    };
  }, [flattenedConfig]);

  // const initialFormData = initialData !== null && mapRolesDataToForm(permissionsData, initialData);

  const form = useForm<RolesValues>({
    resolver: zodResolver(rolesSchema),
    defaultValues: initialData ? {
      role_name: initialData.role,
      is_active: initialData.is_active,
      users: initialData?.user.map(user => user.id.toString()) || [],
    } : emptyDefaults,
  });

  useEffect(() => {
    if (initialData) {
      const mapped = mapRolesDataToForm(permissionsData, initialData);
      form.reset(mapped as unknown as Partial<RolesValues>);
    }
  }, [initialData, form]);

  const onSubmit = async (data: RolesValues) => {
    console.log('this is the data', data)
    try {
      if (initialData) {
        const response = await updateRolesandPermissions(initialData.id, data);
        if (response.status === 200) {
          toast.success("Roles updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ROLES));
        }
      } else {
        const response = await createRolesandPermissions(data);
        if (response.status === 201) {
          toast.success("Roles created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ROLES));
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
              title={
                initialData
                  ? "Edit Manage Roles and Permission"
                  : "Add Manage Roles and Permission"
              }
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.ROLES}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-role-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="role_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">
                      ROLE NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the Name of the role"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>USERS</FormLabel>
                    <FormControl>
                      <PaginatedMultiSelect
                        selectedValues={field.value}
                        onSelectionChange={field.onChange}
                        placeholder="Select Users"
                        fetchData={getUsersDropdown}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Permissions Accordion */}
              <div className="h-[240px] overflow-y-auto">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-3"
                >
                  {permissionsData.map((group, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="cursor-pointer p-3 flex justify-between items-center bg-muted text-sm font-medium">
                        {group.title}
                      </AccordionTrigger>

                      <AccordionContent className="p-4 space-y-4">
                        {group.permissions.map((permission) => (
                          <FormField
                            key={`${group.data}.${permission}`}
                            control={form.control}
                            name={`entities.${group.data}.${permission}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md bg-white">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="capitalize">
                                    {permission} Permission
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
          form="setting-role-form"
          className="text-white rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default RolesForm;
