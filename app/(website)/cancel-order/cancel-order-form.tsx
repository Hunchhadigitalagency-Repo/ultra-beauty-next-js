'use client'
import Link from 'next/link';
import DOMPurify from 'dompurify';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectTrigger } from '@radix-ui/react-select';
import SectionHeader from '@/components/common/header/section-header';
import { CancelFormValues, CancelOrderSchema } from '@/schemas/cancel-order/cancel_order';
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PolicyData = [
    {
        title: "Cancellation Policy",
        desc: "Before cancelling the order, kindly read throughly our terms and conditions."
    }
]

const CancelOrderForm = () => {

    const [isPolicyOpen] = useState(true);
    const [consent, setConsent] = useState(false);
    const form = useForm<CancelFormValues>({
        resolver: zodResolver(CancelOrderSchema),
        defaultValues: {
            reason: '',
            field: ''
        }
    })
    const reasonValue = form.watch("reason");
    const onSubmit = (data: CancelFormValues) => {
        console.log(data);
        form.reset();
    }
    return (
        <section className='w-full h-full'>
            <SectionHeader
                titleClassName="font-playfair text-sm md:text-xl font-bold"
                descriptionClassName="font-poppins text-xs md:text-sm"
                title="Consent Form"
                description="Please fill up the form below." />

            <Form {...form}>
                <form className='py-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='p-10 w-full h-[450px] md:h-[450px]  bg-white rounded-sm'>
                        {/* Terms before cancellation */}
                        <div className='relative w-full border border-gray-300'>
                            {isPolicyOpen && (
                                <Accordion type="single" collapsible >
                                    {PolicyData?.map((data) => (
                                        <AccordionItem
                                            key={data.title}
                                            value={`${data.title}`}
                                            className="rounded-lg  bg-white border-none"
                                        >
                                            <AccordionTrigger className="text-left px-4 font-playfair font-semibold cursor-pointer  text-foreground hover:text-primary hover:no-underline data-[state=open]:text-primary text-lg">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(data.title),
                                                    }}
                                                />
                                            </AccordionTrigger>
                                            <AccordionContent className="text-foreground text-sm font-poppins leading-relaxed pt-2 px-5 pb-4">
                                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.desc) }} />
                                                <ol className='list-decimal list-inside'>
                                                    <li>
                                                        Once you submit this form you agree to cancel the selected item(s) in your order. We will be unable to retrieve your order once it is cancelled.
                                                    </li>
                                                    <li>Once you submit this form you agree to cancel the selected item(s) in your order. We will be unable to retrieve your order once it is cancelled.

                                                    </li>
                                                    <li>Once you submit this form you agree to cancel the selected item(s) in your order. We will be unable to retrieve your order once it is cancelled.

                                                    </li>
                                                    <li>Once you submit this form you agree to cancel the selected item(s) in your order. We will be unable to retrieve your order once it is cancelled.
                                                    </li>
                                                </ol>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            )}
                        </div>
                        {/* Select a reason */}
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem className='py-5'>
                                    <FormLabel className="text-xs md:text-sm font-medium text-custom-black hover:text-primary">
                                        Select a reason
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="text-xs md:text-sm py-3 rounded-md border border-gray-300 text-left px-4">
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
                        <FormField
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-custom-black">
                                Additonal Info (Optional)
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Please add Additional  info if you like to mention them"
                                    className="border-gray-300 placeholder:text-xs bg-white focus:border-blue-500 focus:ring-blue-500"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                        {/* Check Box */}
                        <Label className="flex items-start gap-2 text-xs text-black mt-4">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-0.5 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            I accept the terms & conditions
                        </Label>

                        {/* Cancel order button */}
                        <Link href="/profile/my-cancellation">
                            <div className='w-full flex justify-end items-center'>
                                <Button type='submit' disabled={!reasonValue || !consent} className='px-5 py-1 mt-5 md:px-10 md:py-2.5 lg:px-14 lg:py-3 rounded-full bg-primary text-white '>Cancel Order</Button>
                            </div>
                        </Link>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CancelOrderForm