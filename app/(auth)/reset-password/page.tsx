"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";
import SectionHeader from "@/components/common/header/section-header";
import ButtonLoader from "@/components/common/loader/button-loader";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiBase from "@/services/api-base-instance";

const ResetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),

    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),

    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

interface ResetPasswordFormValues {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

const OTPAndResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { selectedData } = useAppSelector(state => state.authentication);
    const router = useRouter();
    const email = selectedData.email;

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            token: "",
            newPassword: "",
            confirmPassword: "",
        },
    });


    const onSubmit = async (data: ResetPasswordFormValues) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                email: email,
                reset_token: data.token,
                new_password: data.newPassword,
            };

            const response = await apiBase.post("/auth/verify-reset/", payload);

            if (response.status === 200) {
                toast.success("Password updated successfully!");
                form.reset();
                router.push('/login')
            }
        } catch (error) {
            handleError(error, toast);
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        router.push('/forgot');
        return;
    }

    return (
        <div className="flex flex-col items-center min-h-screen gap-10 mt-10">
            <SectionHeader
                title="Verify Token & Reset Password"
                description="Enter the Token you received and your new password"
                className="text-center items-center"
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
                    {/* OTP Field */}
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Enter Token" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* New Password */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter new password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm new password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={loading} className="w-full bg-primary text-white p-5">
                        {loading ? <ButtonLoader /> : "Reset Password"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default OTPAndResetPassword;
