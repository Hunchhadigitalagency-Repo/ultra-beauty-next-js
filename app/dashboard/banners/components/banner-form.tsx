"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import HeaderBackCard from "@/components/common/cards/header-back-card"
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select"
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { IDashboardBanner } from "@/types/banner"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { handleError } from "@/lib/error-handler"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { createBanner, updateBanner } from "@/lib/api/cms/banner-api"
import { getCategoriesDropdown, getProductsDropdown } from "@/lib/api/dropdown/dropdown-api"
import { type BannerFormValues, bannerSchema } from "@/schemas/cms/banner-schema"

interface BannerFromProps {
  initialData: IDashboardBanner | null
}

const BannerForm = ({ initialData }: BannerFromProps) => {
  const router = useRouter()

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: initialData
      ? {
        banner_type: initialData?.banner_type,
        image: initialData?.image || "",
        category: initialData?.category || "",
        page: initialData?.page ?? undefined,
        product: initialData.product?.id.toString() || undefined,
        is_active: initialData?.is_active ?? false,
      }
      : {
        banner_type: "general",
        image: "",
        page: undefined,
        category: "",
        product: undefined,
        subcategories: undefined,
        is_active: false,
      },
  })

  const onSubmit = async (data: BannerFormValues) => {
    try {
      const formData = new FormData()
      formData.append("banner_type", data.banner_type)
      formData.append("is_active", data?.is_active?.toString())

      if (data.image instanceof File) {
        formData.append("image", data.image)
      }



      if (data.product) formData.append('product', data.product?.toString())
      if (data.banner_type === "page") {
        if (data.page) formData.append("page", data.page)
        if (data.category) {
          const categoryArray = [data.category]
          formData.append("categories", String(categoryArray))
        }
      }

      if (initialData) {
        const response = await updateBanner(initialData.id, formData)
        if (response.status === 200) {
          toast.success("Banner updated successfully")
          router.push("/dashboard/banners")
        }
      } else {
        const response = await createBanner(formData)
        if (response.status === 201) {
          toast.success("Banner created successfully")
          router.push("/dashboard/banners")
        }
      }
    } catch (error) {
      handleError(error, toast)
    }
  }
  const product = form.watch('product')
  const category = form.watch('category')

  return (
    <>
      <Card className="border-none shadow-none rounded-sm p-0">
        <CardContent className=" pt-4  pb-8">
          <div className="flex w-full justify-between pb-6">
            <HeaderBackCard title={initialData ? "Edit Banner" : "Add Banner"} fallBackLink="/dashboard/banners" />
          </div>
          <Form {...form}>
            <form
              id="setting-brand-form"
              onSubmit={form.handleSubmit(onSubmit, (err) => console.log("err", err))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="banner_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Banner Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="cursor-pointer">
                          <SelectValue placeholder="Select banner type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">general Banner</SelectItem>
                        <SelectItem value="page">Page Banner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("banner_type") === "general" && (
                <>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">IMAGE</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SELECT PRODUCT</FormLabel>
                        <FormControl>
                          <PaginatedSelect
                            value={field.value as any}
                            onValueChange={field.onChange}
                            placeholder="Select Product"
                            fetchData={getProductsDropdown}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {form.watch("banner_type") === "page" && (
                <>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-muted-foreground">IMAGE</FormLabel>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <FormField
                      control={form.control}
                      name="page"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">PAGE</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                            <FormControl>
                              <SelectTrigger className="cursor-pointer">
                                <SelectValue placeholder="Select page" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all_product">Home</SelectItem>
                              <SelectItem value="best_seller">Best Seller</SelectItem>
                              <SelectItem value="shop">Shop</SelectItem>
                              <SelectItem value="sale">Sale</SelectItem>
                              <SelectItem value="blog">Blog</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {
                      !category && (
                        <FormField
                          control={form.control}
                          name="product"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SELECT PRODUCT</FormLabel>
                              <FormControl>
                                <PaginatedSelect
                                  value={field.value?.toString()}
                                  onValueChange={field.onChange}
                                  placeholder="Select Category"
                                  fetchData={getCategoriesDropdown}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    }
                    {
                      !product && (
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CATEGORY</FormLabel>
                              <FormControl>
                                <PaginatedSelect
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  placeholder="Select Category"
                                  fetchData={getCategoriesDropdown}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    }
                  </div>
                </>
              )}

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
                    <FormLabel htmlFor="activate" className="text-muted-foreground">
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
        <Button type="submit" form="setting-brand-form" className="text-white rounded-sm">
          Save Changes
        </Button>
      </div>
    </>
  )
}

export default BannerForm
