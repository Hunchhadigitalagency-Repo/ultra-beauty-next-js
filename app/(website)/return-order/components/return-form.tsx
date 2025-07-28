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

const ReturnForm: React.FunctionComponent = () => {

    const form = useForm<ReturnFormValues>({
        resolver: zodResolver(ReturnFormSchema),
        defaultValues: {
            reason: '',
            notes: '',
            attachments: []
        },
    });

    const reasonValue = form.watch("reason");

    const onSubmit = (data: ReturnFormValues) => {
        console.log(data);
        form.reset();
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
                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
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
                {/* Notes */}
                <FormField
                    control={form.control}
                    name="notes"
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
                    name="attachments"
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