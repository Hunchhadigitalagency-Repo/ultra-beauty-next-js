"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";

const withdrawalSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    remarks: z.string().min(1, "Remarks are required"),
    payment_voucher: z.union([z.instanceof(File), z.string()]),
});

export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

interface WithdrawalFormProps {
    onSubmit: (data: WithdrawalFormValues, isEdit: boolean) => void;
    defaultValues?: any;
}

const WithdrawalForm = ({ onSubmit, defaultValues }: WithdrawalFormProps) => {
    console.log("fedasad", defaultValues);
    const isEdit = Boolean(defaultValues)
    const form = useForm<WithdrawalFormValues>({
        resolver: zodResolver(withdrawalSchema),
        defaultValues: defaultValues || {
            amount: "",
            remarks: "",
            payment_voucher: undefined,
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => onSubmit(values, isEdit))}
                className="space-y-4"
            >
                {/* Amount */}
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Remarks */}
                <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Remarks</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter remarks" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Voucher */}
                <FormField
                    control={form.control}
                    name="payment_voucher"
                    render={({ field }) => {
                        console.log('this is value', field.value);

                        return (
                            <FormItem>
                                <FormLabel>Voucher</FormLabel>
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
                        )
                    }}
                />

                {/* Submit */}
                <Button type="submit" className="w-full">
                    {defaultValues ? "Update Withdrawal" : "Save Withdrawal"}
                </Button>
            </form>
        </Form>
    );
};

export default WithdrawalForm;
