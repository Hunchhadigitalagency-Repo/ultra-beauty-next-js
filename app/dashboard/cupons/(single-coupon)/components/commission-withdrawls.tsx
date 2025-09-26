"use client";

import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import WithdrawalForm, { WithdrawalFormValues } from "./withdrawl-model";
import { addWithDrawls, deleteWithDrawls, uppdatedWithDrawls } from "@/lib/api/coupons/coupons-api";
import { toast } from "sonner";
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useFetchData from "@/hooks/use-fetch";

interface WithDrawals {
    id: number;
    amount: string;
    remarks: string;
    payment_voucher: string;
}

const CommissionWithdrawals = ({ id, getWithdrawlCommission }: { id: string, getWithdrawlCommission: (amount: number) => void }) => {
    const { data } = useFetchData<WithDrawals[]>(`/influencer-withdrawals/?coupon_id=${id}/`);

    const [withdrawals, setWithdrawals] = useState<WithDrawals[]>(data || []);
    const [open, setOpen] = useState(false);
    const [editingWithdrawal, setEditingWithdrawal] = useState<WithDrawals | null>(null);

    useEffect(() => {
        if (data) {
            setWithdrawals(data);
            const withdrawlAmount = withdrawals.reduce((acc, value) => acc + parseInt(value.amount), 0)
            getWithdrawlCommission(withdrawlAmount)
        }
    }, [data, getWithdrawlCommission, withdrawals]);

    const handleAddWithdrawal = async (formData: WithdrawalFormValues, isEdit: boolean) => {
        try {
            const form = new FormData();
            form.append("coupon", id);
            form.append("amount", formData.amount);
            form.append("remarks", formData.remarks);
            form.append("payment_voucher", formData.payment_voucher);

            let response: any;
            if (isEdit && editingWithdrawal?.id) {
                response = await uppdatedWithDrawls(form, editingWithdrawal?.id);
                setWithdrawals(prev => prev.map(w => w.id === editingWithdrawal?.id ? response.data : w));
                toast.success("Withdrawal updated successfully!");
            } else {
                response = await addWithDrawls(form);
                setWithdrawals(prev => [...prev, response.data]);
                toast.success("Withdrawal added successfully!");
            }

            setEditingWithdrawal(null);
            setOpen(false);
        } catch (error: any) {
            toast.error(`Error: ${error.message || "Unable to save"}`);
        }
    };

    const withdrawDelete = async (id: number) => {
        try {
            await deleteWithDrawls(id);
            setWithdrawals(prev => prev.filter(item => item.id !== id));
        } catch (error: any) {
            toast.error(`Error deleting: ${error.message || "Unable to delete"}`);
        }
    };

    return (
        <div>
            <Accordion type="multiple" defaultValue={["withdrawals"]} className="space-y-4" value={["withdrawals"]}>
                <AccordionItem value="withdrawals" className="rounded-sm border-0">
                    <AccordionTrigger className="px-6 bg-[#EEEEEE] py-4 hover:no-underline flex justify-between">
                        <h2 className="text-base font-semibold text-gray-900">Commission Withdrawals</h2>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="ml-auto" onClick={() => setEditingWithdrawal(null)}>
                                    + Add Withdrawal
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>{editingWithdrawal ? "Edit Withdrawal" : "Add Withdrawal"}</DialogTitle>
                                </DialogHeader>
                                <WithdrawalForm
                                    onSubmit={handleAddWithdrawal}
                                    defaultValues={editingWithdrawal} // Pass row data
                                />
                            </DialogContent>
                        </Dialog>
                    </AccordionTrigger>

                    <AccordionContent>
                        <Card className="border-0">
                            <CardContent className="w-full px-0 border-0">
                                <div className="space-y-3 px-5">
                                    {withdrawals.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-4 font-semibold text-gray-700 border-b pb-2 mb-2">
                                                <span>Amount</span>
                                                <span>Remarks</span>
                                                <span>Voucher</span>
                                                <span>Action</span>
                                            </div>
                                            {withdrawals.map((withdrawal) => (
                                                <div key={withdrawal.id} className="grid grid-cols-4 items-center py-2 border-b last:border-0 text-sm text-gray-700">
                                                    <span>{withdrawal.amount}</span>
                                                    <span>{withdrawal.remarks}</span>
                                                    <Image
                                                        src={withdrawal.payment_voucher}
                                                        alt="Voucher"
                                                        width={50}
                                                        height={50}
                                                        className="rounded"
                                                    />
                                                    <div className="flex w-full justify-start">
                                                        <DropdownMenu >
                                                            <DropdownMenuTrigger asChild >
                                                                <Button variant="ghost" className="p-1 rounded-full">
                                                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-32">
                                                                <DropdownMenuItem
                                                                    className="text-blue-600"
                                                                    onClick={() => {
                                                                        setEditingWithdrawal(withdrawal); // Pass row to modal
                                                                        setOpen(true);
                                                                    }}
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    className="text-red-600"
                                                                    onClick={() => withdrawDelete(withdrawal.id)}
                                                                >
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="text-center text-gray-500 py-10">No withdrawals found.</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};


export default CommissionWithdrawals;
