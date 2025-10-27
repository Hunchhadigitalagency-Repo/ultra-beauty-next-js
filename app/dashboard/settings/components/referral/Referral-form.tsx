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
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  createReferral,
  updateReferral,
} from "@/lib/api/settings/referral-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  referralSchema,
  ReferralValues,
} from "@/schemas/settings/referral-schema";
import { IReferral } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ReferralFromProps {
  initialData: IReferral | null;
}

const ReferralForm = ({ initialData }: ReferralFromProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const form = useForm<ReferralValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: initialData
      ? {
        name: initialData.name,
        point_amount: initialData.point_amount,
        is_active: initialData.is_active ?? false,
      }
      : {
        name: "",
        point_amount: 0,
        is_active: false,
      },
  });

  const onSubmit = async (data: ReferralValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("point_amount", data.point_amount.toString());
      formData.append("is_active", data?.is_active?.toString());

      if (initialData) {
        const response = await updateReferral(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Referral updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.REFERRAL));
        }
      } else {
        const response = await createReferral(formData);
        if (response.status === 201) {
          toast.success("Referral created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.REFERRAL));
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
        <CardContent className=" pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={initialData ? "Edit Referral" : "Add Referral"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.REFERRAL}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-referral-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of the Referral."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="point_amount"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      POINT AMOUNT
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the amount that customer get 1 (one) point."
                        {...field}
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
          form="setting-referral-form"
          className="text-white rounded-sm"
          disabled={loading}
        >
          {loading? <Spinner /> : "Save"}
        </Button>
      </div>
    </>
  );
};

export default ReferralForm;
