"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { verifyOtpSchema } from "@/schemas/auth/auth-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import Link from "next/link";
import { verifyOtpApi } from "@/lib/api/auth/forgot-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedData } from "@/redux/features/authentication-slice";

type VerifyOtpFormValue = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedData } = useAppSelector((state) => state.authentication);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const OTP_LENGTH = 5;

  const form = useForm<VerifyOtpFormValue>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { email: selectedData.email, reset_token: "" },
  });

  const onSubmit = async (data: VerifyOtpFormValue) => {
    try {
      setLoading(true);
      const res = await verifyOtpApi(data);
      if (res.status === 200) {
        dispatch(setSelectedData({ ...selectedData, otp: data.reset_token }));
        toast.success("OTP verified successful", {
          description: "Proceed further to change password",
        });
        router.push("/forgot/reset");
      }
    } catch (error: any) {
      toast.error("Error verifying otp", {
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
          Verify OTP
        </h1>
        <p className="text-xs text-accent-foreground">
          Enter your OTP that you received at your email
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
            name="reset_token"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-3 justify-between">
                    {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                      <Input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-lg font-semibold rounded-md border border-gray-300 focus:outline-none focus:ring-1 placeholder:!text-gray-300 focus:ring-primary"
                        value={field.value?.[index] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length > 1) return;
                          const otpArray = field.value
                            ? field.value.split("")
                            : Array(OTP_LENGTH).fill("");
                          otpArray[index] = value;
                          const updatedOtp = otpArray.join("");
                          field.onChange(updatedOtp);

                          if (value && index < OTP_LENGTH - 1) {
                            inputRefs.current[index + 1]?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Backspace" &&
                            !field.value?.[index] &&
                            index > 0
                          ) {
                            inputRefs.current[index - 1]?.focus();
                          }
                        }}
                        placeholder="9"
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="ml-auto w-full bg-primary text-white border border-primary hover:bg-white hover:text-primary cursor-pointer rounded-full p-5"
            type="submit"
          >
            Verify OTP
          </Button>
        </form>
      </Form>

      <div className="flex gap-2 text-accent-foreground text-sm my-4">
        OTP not received?
        <Link href={"/register"} className="text-primary">
          Resend
        </Link>
      </div>
    </>
  );
}
