"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiBase from "@/services/api-base-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { InformationFormValues, informationSchema } from "@/schemas/information/information-schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetchData from "@/hooks/use-fetch";

interface CareerJobResponse {
    slug: string
    job_title: string
    job_description: string
    job_requirement: string
    job_responsibility: string
    job_type: string
    position: string
    location: string
    end_date: string
    salary: number
    is_active: boolean
    total_applications: number
}

export default function InformationForm() {
    const { data, loading, error } = useFetchData<CareerJobResponse[]>("public-career/");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<InformationFormValues>({
        resolver: zodResolver(informationSchema),
        defaultValues: {
            fullname: '',
            email: '',
            phone: '',
            position: '',
            cv: '',
            cover_letter: '',
            g_recaptcha_response: ""

        },
    });
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    async function onSubmit(data: InformationFormValues) {
        try {
            const formData = new FormData();
            formData.append("full_name", data.fullname);
            formData.append("career", data.position);
            formData.append("email", data.email);
            formData.append("phone_no", data.phone);
            formData.append("g_recaptcha_response", data.g_recaptcha_response);

            if (data.cv instanceof File) {
                formData.append("cv", data.cv);
            }
            if (data.cover_letter instanceof File) {
                formData.append("cover_letter", data.cover_letter);
            }
            setIsLoading(true);
            const response = await apiBase.post('/cms/application/', formData);
            if (response.status === 201) {
                toast.success('Message Sent Successfully')
            }
            form.reset();
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-custom-black">
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Your Full Name"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-custom-black">
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Your Email Address"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone number */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-custom-black">
                                    Phone number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+977"
                                        type="text"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Position */}
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-custom-black">
                                    Position
                                </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}
                                        value={field.value}>
                                        <SelectTrigger className="text-xs">
                                            <SelectValue placeholder="Please select the position you're applying for" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {loading && <SelectItem value="Loading">
                                                    Loading...
                                                </SelectItem>}
                                                {error && <SelectItem value="Failed">
                                                    Failed to load positions
                                                </SelectItem>}
                                                {data && data.map((job, index) => (
                                                    <SelectItem key={index} value={job.slug}>
                                                        {job.position}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="cv"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        CV or Resume
                                    </FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col items-center gap-2">
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    field.onChange(file);

                                                }}
                                            />

                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cover_letter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cover Letter</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col items-center gap-2">

                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    field.onChange(file);

                                                }}
                                            />

                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="g_recaptcha_response"
                        render={() => <FormMessage />}
                    />
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                        size="normal"
                        ref={recaptchaRef}
                        onChange={(token: string | null) => {
                            if (token) {
                                form.setValue("g_recaptcha_response", token)
                            }
                        }}
                    />
                    {/* Submit Button */}
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className={
                            `w-full  
                            bg-primary
                            text-white px-8 py-5 rounded-md`
                        }>
                        {isLoading ? 'Submitting' : 'Submit Now'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
