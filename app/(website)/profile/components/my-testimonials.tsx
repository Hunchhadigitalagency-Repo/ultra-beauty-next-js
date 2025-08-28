"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/common/form/star-rating-input";
import { TestimonialFormValues, testimonialSchema } from "@/schemas/cms/testimonials-schema";



export default function MyTestimonials() {
    const form = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: {
            name: "",
            designation: "",
            company: "",
            message: "",
            image: undefined,
            rating: 0,

        },
    });

    function onSubmit(values: TestimonialFormValues) {
        console.log("Form Values:", values);
    }


    return (
        <div className="w-full p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Add Testimonial</h2>

            <Form {...form}>
                {/* Name */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => field.onChange(e.target.files?.[0])}
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
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );
}
