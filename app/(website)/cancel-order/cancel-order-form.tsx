'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectTrigger } from '@radix-ui/react-select';
import { cancelOrder } from '@/lib/api/order/order-apis';
import SectionHeader from '@/components/common/header/section-header';
import { PolicyData, CancellationReasons } from '@/constants/cancel-data';
import { CancelFormValues, CancelOrderSchema } from '@/schemas/cancel-order/cancel_order';
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';



type CancelOrderFormProps = {
    orderId?: number;
};


const CancelOrderForm: React.FunctionComponent<CancelOrderFormProps> = ({ orderId }) => {
    const [consent, setConsent] = useState(false);
    const form = useForm<CancelFormValues>({
        resolver: zodResolver(CancelOrderSchema),
        defaultValues: {
            reason: '',
            additional_info: ''
        }
    })
    const reasonValue = form.watch("reason");
    const onSubmit = (data: CancelFormValues) => {
        if (orderId && orderId > 0) {
            cancelOrder(orderId.toString(), data.reason, data.additional_info ?? '');
        }
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
                        <div className='relative w-full'>
                            <Accordion type="single" collapsible >
                                <AccordionItem
                                    value={PolicyData.title}
                                    className="rounded-lg"
                                >
                                    <AccordionTrigger className="text-left py-3 px-4 border font-poppins !rounded-md bg-[#FAFAFA] font-medium cursor-pointer  hover:text-primary hover:no-underline data-[state=open]:text-primary text-sm md:text-base">
                                        <h1>
                                            {PolicyData.title}
                                        </h1>
                                    </AccordionTrigger>
                                    <AccordionContent className=" mt-1 border w-full bg-[#FAFAFA] text-primary text-xs md:text-sm font-poppins leading-relaxed pt-2 px-5 pb-4">
                                        <p>{PolicyData.desc}</p>
                                        <ol className='list-decimal list-inside'>
                                            {
                                                PolicyData.points.map((point, index) => (
                                                    <li key={index}>{point}</li>
                                                ))
                                            }
                                        </ol>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        {/* Select a reason */}
                        <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                                <FormItem className='py-5'>
                                    <FormLabel className="text-xs font-medium md:text-sm text-custom-black hover:text-primary">
                                        Select a reason
                                    </FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="px-4 py-3 text-xs text-left border border-gray-300 rounded-md md:text-sm">
                                                <SelectValue placeholder="Please select the reason for Cancellation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {CancellationReasons.map((reason, i) => (
                                                        <SelectItem key={i} value={reason}>
                                                            {reason}
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
                        {/* Description field */}
                        <FormField
                            control={form.control}
                            name="additional_info"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-custom-black">
                                        Additonal Info (Optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Please add Additional  info if you like to mention them"
                                            className="bg-white border-gray-300 placeholder:text-xs focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Check Box */}
                        <Label className="flex items-start gap-2 mt-4 text-xs text-black">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-0.5 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            I accept the terms & conditions
                        </Label>

                        {/* Cancel order button */}
                        <div className='flex items-center justify-end w-full'>
                            <Button type='submit' disabled={!reasonValue || !consent} className='px-5 py-1 mt-5 md:px-10 md:py-2.5 lg:px-14 lg:py-3 rounded-full bg-primary text-white '>Cancel Order</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default CancelOrderForm;