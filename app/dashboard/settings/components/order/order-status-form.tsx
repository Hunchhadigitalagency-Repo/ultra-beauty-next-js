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
import {
  createOrderStatus,
  updateOrderStatus,
} from "@/lib/api/settings/order-status-api";
import { handleError } from "@/lib/error-handler";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import { orderSchema, OrderValues } from "@/schemas/settings/order-schema";
import { IOrderStatus } from "@/types/Settings";
import { ESettings } from "@/types/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface OrderStatusFromProps {
  initialData: IOrderStatus | null;
}

const OrderStatusForm = ({ initialData }: OrderStatusFromProps) => {
  const dispatch = useAppDispatch();
  const form = useForm<OrderValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData
      ? {
          orderStatusName: initialData.name,
          orderStatusPosition: initialData.position,
          primaryColor: initialData.primary_color,
          textColor: initialData.text_color,
          activate: initialData.is_active ?? false,
          isTypeSuccess: initialData.is_type_success ?? false,
          isTypeFailed: initialData.is_type_failed ?? false,
        }
      : {
          orderStatusName: "",
          orderStatusPosition: 1,
          primaryColor: "",
          textColor: "",
          activate: false,
          isTypeSuccess: true,
          isTypeFailed: false,
        },
  });

  const onSubmit = async (data: OrderValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.orderStatusName);
      formData.append("position", data.orderStatusPosition.toString());
      formData.append("primary_color", data.primaryColor);
      formData.append("text_color", data.textColor);
      formData.append("is_active", data?.activate?.toString());
      formData.append("is_type_success", data?.isTypeSuccess?.toString());
      formData.append("is_type_failed", data?.isTypeFailed?.toString());

      if (initialData) {
        const response = await updateOrderStatus(initialData.id, formData);
        if (response.status === 200) {
          toast("Order status updated successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ORDER_STATUS));
        }
      } else {
        const response = await createOrderStatus(formData);
        if (response.status === 201) {
          toast("Order status created successfully");
          dispatch(toggleRefetchTableData());
          dispatch(setActiveSetting(ESettings.ORDER_STATUS));
        }
      }
    } catch (error) {
      handleError(error, toast);
    }
  };

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard
              title={initialData ? "Edit Order Status" : "Add Order Status"}
              fallBackLink="/dashboard/settings"
              settingValue={ESettings.ORDER_STATUS}
            />
          </div>
          <Form {...form}>
            <form
              id="setting-order-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="orderStatusName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      NAME
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please enter the name of the Order."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row justify-around">
                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-muted-foreground">
                        Primary Color
                      </FormLabel>
                      <FormControl>
                        <input
                          type="color"
                          value={field.value}
                          onChange={field.onChange}
                          className="h-10 w-14 rounded border border-input p-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="textColor"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel className="text-muted-foreground">
                        Text Color
                      </FormLabel>
                      <FormControl>
                        <input
                          type="color"
                          value={field.value}
                          onChange={field.onChange}
                          className="h-10 w-14 rounded border border-input p-1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex  justify-between ">
                <div className=" md:flex md:gap-8 md:items-center">
                  <FormField
                    control={form.control}
                    name="activate"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
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
                  <FormField
                    control={form.control}
                    name="isTypeSuccess"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4 ">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="isTypeSuccess"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="isTypeSuccess"
                          className="text-muted-foreground"
                        >
                          IS TYPE SUCCESS
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isTypeFailed"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4 ">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="isTypeFailed"
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="isTypeFailed"
                          className="text-muted-foreground"
                        >
                          IS TYPE FAILED
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="orderStatusPosition"
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex">
                      <FormLabel className=" text-muted-foreground">
                        POSITION
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Please enter the name of the Order."
                          {...field}
                          className="w-18"
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
          form="setting-order-form"
          className="text-white rounded-sm"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default OrderStatusForm;
