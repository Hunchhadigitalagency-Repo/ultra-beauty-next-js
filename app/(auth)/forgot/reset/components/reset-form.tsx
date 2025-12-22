"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/schemas/auth/auth-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resetPasswordApi } from "@/lib/api/auth/forgot-api";

type ResetPasswordFormValue = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const { selectedData } = useAppSelector((state) => state.authentication);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: selectedData.email,
      reset_token: selectedData.otp,
      new_password: "",
      confirm_new_password: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValue) => {
    try {
      setLoading(true);
      const res = await resetPasswordApi(data);
      if (res.status === 200) {
        toast.success("Password reset Successful", {
          description: "Login to continue...",
        });
        router.push("/login");
      }
    } catch (error: any) {
      toast.error("Password reset Failed", {
        description: error?.response?.data?.error || error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs text-accent-foreground">
          Fill the information correctly to reset password
        </p>
        <hr />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 pt-2 w-full"
        >
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Please Enter your new Password"
                      disabled={loading}
                      {...field}
                      className="rounded-xs"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4 r" aria-hidden="true" />
                      ) : (
                        <FaEye
                          className="h-4 w-4 cursor-pointer"
                          aria-hidden="true"
                        />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Please confirm your new Password"
                      disabled={loading}
                      {...field}
                      className="rounded-xs"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-4 w-4 r" aria-hidden="true" />
                      ) : (
                        <FaEye
                          className="h-4 w-4 cursor-pointer"
                          aria-hidden="true"
                        />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Hide password"
                          : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="ml-auto w-full bg-primary text-white border border-primary hover:bg-white hover:text-primary cursor-pointer rounded-xs p-5"
            type="submit"
          >
            Send
          </Button>
        </form>
      </Form>
      <div className="flex gap-2 text-accent-foreground text-sm">
        Don&apos;t have an Account?
        <Link href={"/register"} className="text-primary">
          Register
        </Link>
      </div>
    </>
  );
}
