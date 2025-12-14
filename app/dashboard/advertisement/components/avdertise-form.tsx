"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import HeaderBackCard from "@/components/common/cards/header-back-card"
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader"

import { AdvertiseBannerFormValues, advertiseBannerSchema } from "@/schemas/cms/advertisement-schema"
import { IAdvertisementBanner } from "@/types/cms"
import { addAdvertiseBanner, updateAdvertiseBanner } from "@/lib/api/cms/advertise-banner-apis"
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select"
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"

interface AdvertiseFormProps {
    initialData?: IAdvertisementBanner | null
}

const AdvertiseForm = ({ initialData }: AdvertiseFormProps) => {
    const router = useRouter()
      const [loading, setLoading] = useState(false);
    const position = initialData?.position?.toLowerCase() === "single banner"
        ? "Single Banner"
        : "Mesh Banner"
    const form = useForm<AdvertiseBannerFormValues>({
        resolver: zodResolver(advertiseBannerSchema),
        defaultValues: initialData
            ? {
                position: position || '',
                product: initialData.product?.slug_name || "",
                image: initialData.image || "",
                is_active:true,
            }
            : {
                position: "",
                product: "",
                image: "",
                is_active: true,
            },
    })

    const onSubmit = async (values: AdvertiseBannerFormValues) => {
setLoading(true)
        try {
            const formData = new FormData()
            formData.append("position", values.position)
            formData.append("product_slug", values.product)
            formData.append("is_active", values.is_active ? "true" : "false")

            if (values.image instanceof File) {
                formData.append("image", values.image)
            }


            if (initialData) {
                await updateAdvertiseBanner(initialData?.id, formData)
                toast.success("Banner updated successfully")
            } else {

                await addAdvertiseBanner(formData)
                toast.success("Banner created successfully")
            }

            router.push("/dashboard/advertisement")
        } catch (error: any) {
            toast.error(`Failed: ${error.message || "Unable to save banner"}`)
        } finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Card className="border-none shadow-none rounded-sm p-0">
                <CardContent className="pt-4 pb-8">
                    <div className="flex w-full justify-between pb-6">
                        <HeaderBackCard
                            title={initialData ? "Edit Advertisement Banner" : "Add Advertisement Banner"}
                            fallBackLink="/dashboard/advertisement"
                        />
                    </div>

                    <Form {...form}>
                        <form
                            id="advertise-banner-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Position Dropdown */}
                            <FormField
                                control={form.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-muted-foreground">Banner Position</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="cursor-pointer">
                                                    <SelectValue placeholder="Select position" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Single Banner">Single Banner</SelectItem>
                                                <SelectItem value="Mesh Banner">Mesh Banner</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Product Slug */}
                            <FormField
                                control={form.control}
                                name="product"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-muted-foreground">Product Slug</FormLabel>
                                            <FormControl>
                                                <div className="">
                                                    <PaginatedSelect
                                                        value={field.value?.toString()}
                                                        onValueChange={(_, slug_name) =>{
                                                            console.log('this is slug name',slug_name);
                                                            
                                                            field.onChange(slug_name)}}
                                                        placeholder="Select product"
                                                        fetchData={getProductsDropdown}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            {/* Image Upload */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-muted-foreground">Banner Image</FormLabel>
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

                            {/* Active Switch */}
                           
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <Button
                    type="submit"
                    form="advertise-banner-form"
                    className="text-white rounded-sm"
                    disabled={loading}
                >
                    {loading ? <Spinner /> :  "Save Changes" }
                </Button>
            </div>
        </>
    )
}

export default AdvertiseForm
