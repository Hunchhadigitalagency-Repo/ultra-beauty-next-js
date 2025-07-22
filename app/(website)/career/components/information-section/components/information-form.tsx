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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiBase from "@/services/api-base-instance";
import { zodResolver } from "@hookform/resolvers/zod";
import { InformationFormValues, informationSchema } from "@/schemas/information/information-schema";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { IoMdQuote } from "react-icons/io";


export default function InformationForm() {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<InformationFormValues>({
        resolver: zodResolver(informationSchema),
        defaultValues: {
            fullname: '',
            email: '',
            phone: undefined,
            position: '',
            cv: '',
            resume: ''

        },
    });

    async function onSubmit(values: InformationFormValues) {
        try {
            setIsLoading(true);
            const response = await apiBase.post('cms/contactus/', values);
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
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
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
                                    <Select {...field}>
                                        <SelectTrigger className="text-xs">
                                            <SelectValue placeholder="Please Enter the position that you apply for" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {/* <SelectLabel>Positions</SelectLabel> */}
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col xl:flex-row gap-0 xl:gap-6 space-y-6 xl:space-y-0">
                        {/* CV */}
                        <FormField
                            control={form.control}
                            name="cv"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-custom-black">
                                        CV
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="Upload your CV"
                                            className="border-gray-300 text-sm sm:text-xs focus:border-primary"
                                            onChange={(e) => {
                                                onChange(e.target.files?.[0]);
                                            }}
                                            onBlur={onBlur}
                                            name={name}
                                            ref={ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* CV */}
                        <FormField
                            control={form.control}
                            name="resume"
                            render={({ field: { onChange, onBlur, name, ref } }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-custom-black">
                                        Resume
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="Upload your CV"
                                            className="border-gray-300 text-sm sm:text-xs focus:border-primary"
                                            onChange={(e) => {
                                                onChange(e.target.files?.[0]);
                                            }}
                                            onBlur={onBlur}
                                            name={name}
                                            ref={ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
