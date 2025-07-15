"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IPersonalProfile } from "@/types/Settings";
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
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import {
  personalProfileSchema,
  PersonalProfileValues,
} from "@/schemas/settings/personal-profile-schema";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { updatePersonalProfile } from "@/lib/api/settings/profile-api";

interface ProfileFromProps {
  initialData: IPersonalProfile | null;
}

const PersonalProfile = ({ initialData }: ProfileFromProps) => {
  const form = useForm<PersonalProfileValues>({
    resolver: zodResolver(personalProfileSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.first_name,
          lastName: initialData.last_name,
          personalAddress: initialData?.profile?.address,
          personalEmail: initialData.email,
          personalProfile: initialData?.profile?.profile_picture,
        }
      : {
          firstName: "",
          lastName: "",
          personalAddress: "",
          personalEmail: "",
          personalProfile: "",
        },
  });

  const onSubmit = async (data: PersonalProfileValues) => {
    try {
      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("address", data.personalAddress);
      formData.append("email", data.personalEmail);

      if (data.personalProfile instanceof File) {
        formData.append("profile_picture", data.personalProfile);
      }

      const response = await updatePersonalProfile(formData);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <Form<PersonalProfileValues> {...form}>
            <form
              id="setting-profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <h1 className="text-lg font-semibold py-4">Personal Profile</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          FIRST NAME
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter the first name."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          LAST NAME
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter the last name."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="personalAddress"
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
                  <FormField
                    control={form.control}
                    name="personalEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          EMAIL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="basera@gmail.com"
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="personalProfile"
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
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          form="setting-profile-form"
          className="text-white rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default PersonalProfile;
