"use client";

import HeaderBackCard from "@/components/common/cards/header-back-card";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import PaginatedProductSelect from "@/components/common/paginated-select/paginated-product-select";
import { useCouponUser } from "@/components/seeds/coupon-users";
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
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { createCoupons, updateCoupons } from "@/lib/api/coupons/coupons-api";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";
import { handleError } from "@/lib/error-handler";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  CouponFormValue,
  couponSchema,
} from "@/schemas/coupons/coupons-schema";
import { ICoupon } from "@/types/cupons";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// const allUsers = [
//   {
//     id: "1",
//     name: "Ram kumar",
//     avatar: "https://randomuser.me/api/portraits/women/51.jpg",
//   },
//   {
//     id: "2",
//     name: "Shyam Bahadur",
//     avatar: "https://randomuser.me/api/portraits/men/52.jpg",
//   },
//   {
//     id: "3",
//     name: "Someone kumar",
//     avatar: "https://randomuser.me/api/portraits/women/53.jpg",
//   },
//   {
//     id: "4",
//     name: "noone bahadur",
//     avatar: "https://randomuser.me/api/portraits/men/54.jpg",
//   },
// ];

interface CouponFormProps {
  initialData: ICoupon | null;
}

const CouponForm = ({ initialData }: CouponFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const title = initialData ? "Edit Coupons" : "Add Coupons";
  const allUsers = useCouponUser();
  // const allUsers = users?.map((user: any) => {
  //   return {
  //     id: user.user_id, // or String(user.user_id) if you need string
  //     name: user.first_name + " " + user.last_name,
  //     avatar: user.profile_picture || user.google_avatar || "/placeholder.svg",
  //   };
  // });


  const [loading, setLoading] = useState(false);
  const form = useForm<any>({
    resolver: zodResolver(couponSchema),
    defaultValues: initialData
      ? {
        coupon_type: initialData?.coupon_type,
        coupon_name: initialData?.name,
        coupon_image: initialData?.image,
        coupon_title: initialData?.title,
        coupon_sub_title: initialData?.subtitle,
        discount_percentage: Number(initialData?.discount_percentage),
        coupon_code: initialData?.code,
        expiry_date: initialData?.expiry_date,
        products: initialData?.products,
        category: initialData?.categories?.[0]?.toString(),
        sub_category: initialData?.subcategories?.[0]?.toString(),
        commission_percentage: initialData?.commission_percentage || 0,
        withdrawal_limit: initialData?.withdrawal_limit || 0,
        influencer: initialData?._influencers,
        is_active: initialData?.is_active,
        non_reusable: initialData?.non_reusable,
      }
      : {
        coupon_type: "general",
        coupon_name: "",
        coupon_image: "",
        coupon_title: "",
        coupon_sub_title: "",
        discount_percentage: 0,
        coupon_code: "",
        expiry_date: "",
        products: [],
        category: "",
        sub_category: "",
        is_active: false,
        non_reusable: false,
        commission_percentage: 0,
        withdrawal_limit: 0,
        influencer: [],
      },
  });

  const watchType = form.watch("coupon_type");

  const removeUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const onSubmit = async (data: CouponFormValue) => {
    setLoading(true)
    try {
      const formData = new FormData();

      if (watchType === "general") {
        formData.append("coupon_type", data.coupon_type);
        formData.append("name", data.coupon_name);
        formData.append("code", data.coupon_code);
        if (data.coupon_title) {
          formData.append("title", data.coupon_title);
        }
        data.products?.forEach((product) =>
          formData.append("products", product?.id?.toString())
        );
        if (data.category) {
          formData.append("categories", data.category);
        }
        if (data.sub_category) {
          formData.append("subcategories", data.sub_category);
        }
        if (data.expiry_date) {
          formData.append("expiry_date", data.expiry_date);
        }
        if (data.coupon_sub_title) {
          formData.append("subtitle", data.coupon_sub_title);
        }
        formData.append(
          "discount_percentage",
          data.discount_percentage.toString()
        );
        formData.append("is_active", data?.is_active?.toString());
        formData.append("non_reusable", data?.non_reusable?.toString());

        if (data.coupon_image instanceof File) {
          formData.append("image", data.coupon_image);
        }
      }

      if (watchType === "influencer") {
        // console.log('influencer data: ', data);

        formData.append("coupon_type", data.coupon_type);
        formData.append("name", data.coupon_name);
        formData.append("code", data.coupon_code);
        formData.append(
          "discount_percentage",
          data.discount_percentage.toString()
        );
        if (data.commission_percentage) {
          formData.append(
            "commission_percentage",
            data.commission_percentage.toString()
          );
        }
        if (data.withdrawal_limit) {
          formData.append(
            "withdrawal_limit",
            data.withdrawal_limit?.toString()
          );
        }
        data.products?.forEach((product) =>
          formData.append("products", product?.id?.toString())
        );
        if (data.category) {
          formData.append("categories", data.category);
        }
        if (data.sub_category) {
          formData.append("subcategories", data.sub_category);
        }
        if (data.category) {
          formData.append("categories", data.category);
        }
        // console.log(selectedUsers);

        selectedUsers?.forEach((inf) => formData.append(`_influencers`, inf.id));
        formData.append("is_active", data?.is_active?.toString());
      }

      if (initialData) {
        const response = await updateCoupons(initialData.id, formData);
        if (response.status === 200) {
          toast.success("Coupons updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/cupons");
        }
      } else {
        const response = await createCoupons(formData);
        if (response.status === 201) {
          toast.success("Coupons created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/cupons");
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
        <CardContent className="pt-4 pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard title={title} fallBackLink="/dashboard/cupons" />
          </div>

          <Form {...form}>
            <form
              id="expert-recommendation-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="coupon_type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel className="text-muted-foreground">
                        COUPON TYPE
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select coupon type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">
                            General Coupon
                          </SelectItem>
                          <SelectItem value="influencer">
                            Influencer Referral Coupon
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coupon_name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        COUPON NAME
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the coupon name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coupon_code"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground">
                        COUPON CODE
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the coupon code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount_percentage"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className=" text-muted-foreground">
                        COUPON DISCOUNT PERCENTAGE
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          value={field.value}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            field.onChange(
                              val > 0 && val < 100 ? val : ""
                            );
                          }}
                          placeholder="Please enter the tax percentage."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchType === "general" ? (
                  <>
                    <FormField
                      control={form.control}
                      name="expiry_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EXPIRY DATE</FormLabel>

                          <FormControl>
                            <Input
                              placeholder="Select Start Duration"
                              type="datetime-local"
                              {...field}
                              className={field.value ? "" : "!text-xs"}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div></div>
                  </>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="commission_percentage"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className=" text-muted-foreground">
                            COMMISSION PERCENTAGE
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                              }}
                              placeholder="Please enter the tax percentage."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="withdrawal_limit"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className=" text-muted-foreground">
                            WITHDRAWAL LIMIT
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(
                                  e.target.value === ""
                                    ? ""
                                    : Number(e.target.value)
                                );
                              }}
                              placeholder="Please enter the tax percentage."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {
                  form.watch('coupon_type') !== "general" &&
                  <>
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
                    {/* <FormCombobox
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
                    /> */}
                  </>
                }
              </div>
              {watchType === "general" && (
                <>
                  <FormField
                    control={form.control}
                    name="coupon_title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-muted-foreground">
                          COUPON TITLE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the coupon title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coupon_sub_title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-muted-foreground">
                          COUPON SUB-TITLE
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the coupon sub-title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coupon_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">
                          COUPON IMAGE
                        </FormLabel>
                        <FormControl>
                          <SingleImageUploader
                            onChange={field.onChange}
                            onRemove={() => field.onChange(undefined)}
                            value={field.value}
                            size="small"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {watchType === "influencer" && (
                <div className=" flex flex-col gap-2">
                  <FormLabel className="text-muted-foreground">
                    INFLUENCERS
                  </FormLabel>

                  <div className="w-full">
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
                        <SelectValue placeholder="Select the user" />
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

                  <div className="flex flex-wrap gap-4">
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
              )}
              <div className=" flex gap-10">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="is_active"
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="is_active"
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
                  name="non_reusable"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="non_reusable"
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="non_reusable"
                        className="text-muted-foreground"
                      >
                        NON REUSABLE
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
          form="expert-recommendation-form"
          className="text-white rounded-sm"
        >
        {loading ? <Spinner /> : "Save"
        }        </Button>
      </div>
    </>
  );
};

export default CouponForm;
