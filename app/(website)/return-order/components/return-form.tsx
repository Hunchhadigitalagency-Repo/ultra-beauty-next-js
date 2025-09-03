import React from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    ReturnFormSchema,
    ReturnFormValues
} from '@/schemas/return/return-schema';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionHeader from '@/components/common/header/section-header';
import MultiImageUploader, { FileWithMetadata } from '@/components/common/ImageUploader/multi-image-uploader';
import { Input } from '@/components/ui/input';
import { returnOrder } from '@/lib/api/order/order-apis';

const returnReasons = [
    { value: 'damaged', label: 'Damaged Item' },
    { value: 'wrong_item', label: 'Wrong Item Sent' },
    { value: 'not_as_described', label: 'Item Not as Described' },
    { value: 'changed_mind', label: 'Changed Mind' },
    { value: 'other', label: 'Other' },
];



interface ReturnFormProps {
    order_id: number
    order_detail_id: number
    quantity: number | undefined

}
const ReturnForm: React.FunctionComponent<ReturnFormProps> = ({ order_id, order_detail_id, quantity }) => {

    const form = useForm<ReturnFormValues>({
        resolver: zodResolver(ReturnFormSchema),
        defaultValues: {
            reason: '',
            additional_info: '',
            quantity: 1,
            attachment: []
        },
    });

    const reasonValue = form.watch("reason");

    const onSubmit = (data: ReturnFormValues) => {
        if (data) {
            returnOrder(
                order_id,
                order_detail_id,
                data.quantity,
                data.additional_info,
                data.reason,
                data.attachment as File[] | undefined
            )
        }
        form.reset()
    }


    return (
        <Form {...form}>
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
                <SectionHeader
                    title='Reason for return'
                    description='Please Mark the reason'
                    titleClassName='text-xl xl:text-xl'
                    descriptionClassName='text-xs sm:text-sm md:text-sm'
                />
                {/* Reason */}
                <div className="flex gap-4">
                    {/* Reason */}
                    <FormField
                        control={form.control}
                        name="reason"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="text-sm font-medium text-custom-black">
                                    Select a reason
                                </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="text-xs bg-white">
                                            <SelectValue placeholder="Please select the reason for Return" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {returnReasons.map((reason) => (
                                                    <SelectItem
                                                        key={reason.value}
                                                        value={reason.value}
                                                        className="text-xs"
                                                    >
                                                        {reason.label}
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

                    {/* Quantity */}
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="w-32">
                                <FormLabel className="text-sm font-medium text-custom-black">
                                    Quantity
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={quantity}
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* Notes */}
                <FormField
                    control={form.control}
                    name="additional_info"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-custom-black">
                                Notes (Optional)
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
                {/* Attachments */}
                <FormField
                    control={form.control}
                    name="attachment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-custom-black">
                                Additional Attachments (Optional)
                            </FormLabel>
                            <FormControl>
                                <MultiImageUploader
                                    value={field.value || []}
                                    onChange={(files: FileWithMetadata[]) => {
                                        field.onChange(files);
                                    }}
                                    onRemove={(files: FileWithMetadata[]) => {
                                        field.onChange(files);
                                    }}
                                    isMultiple
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Button */}
                <div className='w-full flex justify-end items-center'>
                    <Button disabled={!reasonValue} className='rounded-full' type='submit'>
                        Return Order
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ReturnForm