"use client";

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
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import {
  getAllEntities,
  mapRolesDataToForm,
} from "@/lib/roles-permissions-utils";
import { permissionsData } from "@/constants/permissions-data";
import { Checkbox } from "@/components/ui/checkbox";
import { IRoles } from "@/types/roles-permissions";
import { ESettings } from "@/types/table";

// Example static user list
const allUsers = [
  {
    id: "1",
    name: "Ram kumar",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
  },
  {
    id: "2",
    name: "Shyam Bahadur",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "3",
    name: "Someone kumar",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
  },
  {
    id: "4",
    name: "noone bahadur",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
  },
];

interface RolesFromProps {
  initialData: IRoles | null;
}

const RolesForm = ({ initialData }: RolesFromProps) => {
  const initialFormData =
    initialData !== null && mapRolesDataToForm(permissionsData, initialData);
  const flattenedConfig = getAllEntities(permissionsData);

  const form = useForm<RolesValues>({
    resolver: zodResolver(rolesSchema),
    defaultValues: initialFormData || {
      role_name: "",
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
    },
  });

  const [selectedUsers, setSelectedUsers] = useState<typeof allUsers>([]);
  const [openGroupIndexes, setOpenGroupIndexes] = useState<number[]>([]);

  const toggleGroup = (index: number) => {
    setOpenGroupIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const onSubmit = (data: RolesValues) => {
    console.log("Submitted Data: ", {
      ...data,
      selectedUsers,
    });
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

              <div className=" flex flex-col gap-2">
                <FormLabel className="text-muted-foreground">
                  SELECT USERS
                </FormLabel>

                <div className=" w-full">
                  <Select
                    onValueChange={(userId) => {
                      const user = allUsers.find((u) => u.id === userId);
                      if (
                        user &&
                        !selectedUsers.find((u) => u.id === user.id)
                      ) {
                        setSelectedUsers((prev) => [...prev, user]);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select the user to assign the role" />
                    </SelectTrigger>
                    <SelectContent>
                      {allUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className=" grid grid-cols-4 gap-4">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="relative flex items-center gap-2 border rounded-md px-3 py-2"
                    >
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        height={10}
                        width={10}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-sm">{user.name}</span>
                      <button
                        type="button"
                        className="absolute -top-1 right-2 text-base cursor-pointer text-gray-400 hover:text-red-500 ml-1"
                        onClick={() => removeUser(user.id)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissions Accordion */}
              <div className="space-y-3">
                {permissionsData.map((group, index) => (
                  <div key={index} className=" rounded-md bg-muted">
                    <div
                      onClick={() => toggleGroup(index)}
                      className="cursor-pointer p-3 flex justify-between items-center"
                    >
                      <span className="text-sm font-medium">{group.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openGroupIndexes.includes(index) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {openGroupIndexes.includes(index) &&
                      group.permissions.length > 0 && (
                        <div className="pl-6 pb-4 space-y-2">
                          {group.permissions.map((permission) => (
                            <FormField
                              key={`${group.data}.${permission}`}
                              control={form.control}
                              name={`entities.${group.data}.${permission}`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
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
                            ></FormField>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
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
