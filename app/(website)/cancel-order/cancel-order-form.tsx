import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectTrigger } from '@radix-ui/react-select';
import SectionHeader from '@/components/common/header/section-header';
import { InformationFormValues, informationSchema } from '@/schemas/information/information-schema';
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type FormData = {
    reason: string;
    additionalInfo?: string;
    termsAccepted: boolean;
};
const CancelOrderForm = () => {
    const { register, handleSubmit, } = useForm<FormData>();
    const [isPolicyOpen, setIsPolicyOpen] = useState(true);
    const [consent, setConsent] = useState(false);

    const form = useForm<InformationFormValues>({
        resolver: zodResolver(informationSchema),
        defaultValues: {
            fullname: '',
            email: '',
            phone: '',
            position: '',
            cv: '',
            resume: ''

        },
    });

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
    };

    return (
        <section className='w-full h-full'>
            <SectionHeader
                titleClassName="font-playfair text-sm md:text-xl font-bold"
                descriptionClassName="font-poppins text-xs md:text-sm"
                title="Consent Form"
                description="Please fill up the form below." />

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='py-5'>
                    <div className='p-10 w-full h-[450px] md:h-[550px]  bg-white rounded-sm'>
                        {/* Terms before cancellation */}
                        <div className='relative p-4 w-full border border-gray-300'>
                            <div className='flex justify-between items-center'
                                onClick={() => setIsPolicyOpen(!isPolicyOpen)}>
                                <h1 className='font-playfair font-semibold text-sm md:text-xl'>
                                    Cancellation Policy
                                </h1>
                                {isPolicyOpen ?
                                    <ChevronUp className="w-5 h-5" />
                                    : <ChevronDown className="w-5 h-5" />}
                            </div>
                            {isPolicyOpen && (
                                <div className=" absolute left-0 top-full bg-gray-100  px-5 mt-2 flex flex-col font-poppins gap-2 text-sm text-gray-800 leading-relaxed">
                                    <p className="">Before cancelling the order, kindly read thoroughly our following terms & conditions:</p>
                                    <ol className="list-decimal list-inside space-y-1">
                                        <li>
                                            Once you submit this form you agree to cancel the selected item(s) in your order. We will be unable to retrieve your order once it is cancelled.
                                        </li>
                                        <li>
                                            Once you confirm your item(s) cancellation, we will process your refund within 24 hours, provided the item(s) has not been handed over to the logistics partner yet. Please note that, if your item has already been handed over to the logistics partner, we will be unable to proceed with your cancellation request and we will inform you accordingly.
                                        </li>
                                        <li>
                                            If you are cancelling your order partially, i.e. not all the items in your order, then we will be unable to refund you the shipping fee.
                                        </li>
                                        <li>
                                            Once your item(s) has been successfully cancelled you will receive a notification from us with your refund summary.
                                        </li>
                                    </ol>
                                </div>
                            )}
                        </div>
                        {/* Select a reason */}
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem className='py-5'>
                                    <FormLabel className="text-sm font-medium text-custom-black">
                                        Select a reason
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="text-xs md:text-sm p-3 border border-gray-300">
                                                <SelectValue placeholder="Please select the reason for Cancellation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
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
                        {/* Description field */}
                        <div className='py-5'>
                            <label className="block font-medium mb-1 text-xs md:text-sm">Additional Info (Optional)</label>
                            <textarea
                                {...register("additionalInfo")}
                                placeholder="Please add any additional info if you like to mention them"
                                className="w-full  border border-gray-300 rounded px-3 py-2 text-sm md:h-32 resize-none"
                            />
                        </div>
                        {/* news letter */}
                        <label className="flex items-start gap-2 text-xs text-black mt-4">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-0.5 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            I accept the terms & conditions
                        </label>
                        {/* Cancel order button */}
                        <Link href="/profile">
                            <div className='absolute right-32 py-6'>
                                <button className='px-5 py-1 md:px-10 md:py-2.5 lg:px-14 lg:py-3 rounded-full bg-primary text-white '>Cancel Order</button>
                            </div>
                        </Link>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CancelOrderForm