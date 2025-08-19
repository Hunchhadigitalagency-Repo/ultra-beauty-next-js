import React from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ProfileFormValues,
  ProfileSchema,
} from "@/schemas/profile/profile-schema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthProfileResponse } from "@/types/profile";
import { updateMyProfile } from "@/lib/api/profile/my-profile-api";
import GenericModal from "@/components/common/modals/generic-modal";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";

interface ProfileModalProps {
  data: AuthProfileResponse | null;
  imageUrl: string | undefined;
  onClose: () => void;
}

const ProfileModal: React.FunctionComponent<ProfileModalProps> = ({ onClose, data, imageUrl }) => {

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      phone_number: data?.phone_number || "",
      address: data?.address || "",
      profile_picture: data?.profile_picture ? data?.profile_picture : imageUrl,
    },
  });

  const onSubmit = (data: ProfileFormValues) => {

    const form = new FormData();
    form.append("first_name", data.first_name ?? "");
    form.append("last_name", data.last_name ?? "");
    form.append("phone_number", data.phone_number ?? "");
    form.append("address", data.address ?? "");
    form.append("profile_picture", data.profile_picture ?? "");
    updateMyProfile(form);
    onClose();
  };

  return (
    <GenericModal
      title="Change Profile"
      setIsOptionClick={onClose}
      titleClassName="text-primary font-poppins font-normal text-base xl:text-xl"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-4 lg:gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Profile Image */}
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Profile Image</FormLabel>
                <div className="grid grid-cols-[35%_65%] lg:grid-cols-[30%_65%] gap-2 lg:gap-5 md:grid-cols-2">
                  <div className="w-full flex items-center justify-center">
                    <div className="relative w-24 h-24 md:w-28 md:h-28">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Profile"
                          layout="fill"
                          className="object-cover rounded-full"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SingleImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      onRemove={() => field.onChange(undefined)}
                    />
                  </div>
                </div>
              </FormItem>
            )}
          />
          {/* First Name */}
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    className="placeholder:text-xs text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Last Name */}
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    className="placeholder:text-xs text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    className="placeholder:text-xs text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button className="w-full" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </GenericModal>
  );
};

export default ProfileModal;
