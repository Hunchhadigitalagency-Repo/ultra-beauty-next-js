"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/common/form/star-rating-input";
import { TextTestimonialFormValues, textTestimonialSchema } from "@/schemas/cms/testimonials-schema";
import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";
import { createUserTestimonials, updateUserTestimonials } from "@/lib/api/cms/testimonials-api";
import useFetchData from "@/hooks/use-fetch";
import { IDashboardITestimonial } from "@/types/cms";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";



export default function MyTestimonials() {

    const { data, refetch } = useFetchData<IDashboardITestimonial[]>('cms/user-testimonials/', true)
    const initialData = data?.[0] || null;

    const form = useForm<TextTestimonialFormValues>({
        resolver: zodResolver(textTestimonialSchema),
        defaultValues: {
            name: "",
            designation: "",
            company: "",
            message: "",
            image: undefined,
            rating: 0,
            is_active: true,
            is_video: false,
        },
    });

    React.useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                designation: initialData.designation,
                company: initialData.company,
                message: initialData.message,
                image: initialData.image,
                rating: initialData.rating,
                is_active: true,
                is_video: false,
            })
        }
    }, [initialData])

    async function onSubmit(data: TextTestimonialFormValues) {
        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("designation", data.designation)
            formData.append("company", data.company)
            formData.append("is_active", data.is_active.toString())
            formData.append("is_video", data.is_video.toString())

            formData.append("message", data.message)
            formData.append("rating", data.rating.toString())
            if (data.image instanceof File) {
                formData.append("image", data.image)
            }

            if (initialData) {
                const response = await updateUserTestimonials(formData, initialData?.slug)
                if (response.status === 200) {
                    toast.success("Testimonial updated successfully")
                }
                form.reset()
                refetch()
            } else {
                const response = await createUserTestimonials(formData)
                if (response.status === 201) {
                    toast.success("Testimonial created successfully")
                }
                form.reset()
                refetch()
            }
        } catch (error) {
            handleError(error, toast)
        }
    }


    return (
        <div className="w-full p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">{initialData ? "Edit Testimonial" : "Add Testimonial"}</h2>

            <Form {...form}>
                {/* Name */}
                <form onSubmit={form.handleSubmit(onSubmit, err => console.log('err', err)
                )} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter the name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="grid grid-cols-2 gap-4">
                        {/* Designation */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Designation" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Company */}
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter company name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Message */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter the testimonial message" className="min-h-0 field-sizing-fixed" rows={5} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Image */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <SingleImageUploader
                                        value={field.value}
                                        onRemove={() => field.onChange(undefined)}
                                        onChange={field.onChange}
                                        size="small"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Rating */}
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <div className="flex gap-2 items-center">
                                        <StarRating
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-20 block ml-auto">
                        {initialData ? "Update" : "Save"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
