import { Card, CardContent } from "@/components/ui/card";
import {
  companyProfileSchema,
  CompanyProfileValues,
} from "@/schemas/settings/company-profile-schema";
import { ICompanyProfile } from "@/types/Settings";
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
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { ESettings } from "@/types/table";
import { useAppDispatch } from "@/redux/hooks";
import { updateCompanyProifle } from "@/lib/api/settings/profile-api";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface ProfileFromProps {
  initialData: ICompanyProfile | null;
}

const Profile = ({ initialData }: ProfileFromProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
console.log(initialData);

  const form = useForm<CompanyProfileValues>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: initialData?.company_name,
      companyAddress: initialData?.company_address,
      companyLogo: initialData?.company_logo_url,
      companyFavIcon: initialData?.company_favicon_url,
    },
  });

  const onSubmit = async (data: CompanyProfileValues) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("company_name", data.companyName);
      formData.append("company_address", data.companyAddress);

      if (data.companyLogo instanceof File) {
        formData.append("company_logo", data.companyLogo);
      }
      if (data.companyFavIcon instanceof File) {
        formData.append("company_favicon", data.companyFavIcon);
      }

      const response = await updateCompanyProifle(formData);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        dispatch(setActiveSetting(ESettings.PROFILE));
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p">
        <CardContent className="px-4 ">
          <div className="flex w-full justify-between pb-6">
            <p className="text-lg font-semibold">Company Profile</p>
          </div>
          <Form<CompanyProfileValues> {...form}>
            <form
              id="setting-profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        COMPANY NAME
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the name of the company."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        COMPANY ADDRESS
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the company address."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        COMPANY LOGO (250px * 400px)
                      </FormLabel>
                      <FormControl>
                        <SingleImageUploader
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange(undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyFavIcon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        COMPANY FAV ICON (32px * 32px)
                      </FormLabel>
                      <FormControl>
                        <SingleImageUploader
                          value={field.value}
                          onChange={field.onChange}
                          onRemove={() => field.onChange(undefined)}
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

      <div className="flex justify-start -mt-4 px-4">
        <Button
          type="submit"
          form="setting-profile-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> : "Save Changes" }
        </Button>
      </div>
    </>
  );
};

export default Profile;
