"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import { FormCombobox } from "@/components/common/form/form-combobox";
import { PaginatedProductSelect } from "@/components/common/paginated-select/paginated-product-select";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useFetchDropdown from "@/hooks/use-fetch-dropdown";
import {
  createNavigationInfo,
  updateNavigationInfo,
} from "@/lib/api/cms/navigation-info-api";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";
import { handleError } from "@/lib/error-handler";
import {
  NavigationInfoFormValues,
  navigationInfoSchema,
} from "@/schemas/cms/navigation-info-schema";
import { ICategoryDropdown } from "@/types/dropdown";
import { INavigationInfo } from "@/types/navigation-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NavigationInfoFromProps {
  initialData: INavigationInfo | null;
}

const NavigationInfoForm = ({ initialData }: NavigationInfoFromProps) => {
  const title = initialData ? "Edit Navigation Info" : "Add Navigation Info";

  const router = useRouter();

  const form = useForm<NavigationInfoFormValues>({
    resolver: zodResolver(navigationInfoSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          discount_percentage: initialData.discount_percentage || 0,
          expiry_datetime: initialData.expiry_datetime || "",
          products: initialData.products || [],
          category: initialData.categories[0],
          sub_category: initialData.subcategories[0],
          is_active: initialData.is_active ?? false,
        }
      : {
          title: "",
          discount_percentage: 0,
          expiry_datetime: "",
          is_active: false,
          products: [],
          category: "",
          sub_category: "",
        },
  });

  const { data: categories } = useFetchDropdown<ICategoryDropdown>(
    "/categoriesdropdown/"
  );

  const onSubmit = async (data: NavigationInfoFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append(
        "discount_percentage",
        data.discount_percentage.toString()
      );
      formData.append("expiry_datetime", data.expiry_datetime);
      if (data.category) {
        formData.append("categories", data.category);
      }
      if (data.sub_category) {
        formData.append("subcategories", data.sub_category);
      }
      formData.append("is_active", data?.is_active?.toString());

      data?.products?.forEach((product) => {
        formData.append("products", product);
      });

      if (initialData) {
        const response = await updateNavigationInfo(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Navigation info updated successfully");
          router.push("/dashboard/navigation-info");
        }
      } else {
        const response = await createNavigationInfo(formData);
        if (response.status === 201) {
          toast.success("Navigation info created successfully");
          router.push("/dashboard/navigation-info");
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
              title={title}
              fallBackLink="/dashboard/navigation-info"
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
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" text-muted-foreground">
                      TITLE
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the title of the navigation."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="discount_percentage"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className=" text-muted-foreground">
                        DISCOUNT PERCENTAGE
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="decimal"
                          value={field.value}
                          onChange={(e) => {
                            const onlyNums = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            const sanitized = onlyNums.replace(
                              /(\..*?)\..*/g,
                              "$0"
                            );
                            field.onChange(Number(sanitized));
                          }}
                          placeholder="Please enter the discount percentage."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiry_datetime"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        EXPIRY DATE & TIME
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem className="m-0 p-0">
                      <FormLabel>PRODUCTS</FormLabel>
                      <FormControl>
                        <PaginatedProductSelect
                          selectedValues={field.value}
                          onSelectionChange={field.onChange}
                          title="Select Products"
                          fetchData={getProductsDropdown}
                          className="w-full "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormCombobox
                  form={form}
                  name="category"
                  label="CATEGORY"
                  placeholder="Select a category"
                  searchPlaceholder="Search Category..."
                  options={categories?.map((category) => ({
                    value: category.id.toString(),
                    label: category.name,
                  }))}
                />
                <FormField
                  control={form.control}
                  name="sub_category"
                  render={({ field }) => {
                    const selectedCategory = form.watch("category");
                    const subCategories =
                      categories?.find((category) =>
                        selectedCategory?.includes(category.id.toString())
                      )?.subcategories || [];
                    return (
                      <FormItem>
                        <FormLabel className="">SUB CATEGORY</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="">
                              <SelectValue
                                defaultValue={field.value?.toString()}
                                placeholder="Select Sub Category"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories.length > 0 ? (
                              subCategories.map((option) => {
                                return (
                                  <SelectItem
                                    key={option.id}
                                    value={
                                      option?.id ? option.id.toString() : ""
                                    }
                                  >
                                    {option.name}
                                  </SelectItem>
                                );
                              })
                            ) : (
                              <p className="text-sm px-4">
                                No Subcategories Found
                              </p>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
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
          form="setting-brand-form"
          className="text-white rounded-sm"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default NavigationInfoForm;
