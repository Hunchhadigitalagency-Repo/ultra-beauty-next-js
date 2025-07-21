"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordFormSchema } from "@/schemas/auth/auth-schema";
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
import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { forgotPasswordApi } from "@/lib/api/auth/forgot-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setSelectedData } from "@/redux/features/authentication-slice";

type ForgotPasswordFormValue = z.infer<typeof forgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValue>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValue) => {
    try {
      setLoading(true);
      const res = await forgotPasswordApi(data);
      if (res.status === 200) {
        setStatus("success");
        toast.success("Email sent successful", {
          description: "proceed further to change password",
        });
        dispatch(setSelectedData({ email: data.email }));
        setTimeout(() => router.push("/verify"), 5000);
      }
    } catch (error: any) {
      setStatus("error");
      toast.error("Error reseting password", {
        description: error?.response?.data?.error || error?.message,
      });
      setTimeout(() => setStatus(""), 5000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">
          Forgot Password
        </h1>
        <p className="text-xs text-accent-foreground">
          Fill the information correctly to reset password
        </p>
        <hr />
      </div>
      {status === "" ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-2 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        required
                        type="email"
                        placeholder="Please Enter the email Address"
                        disabled={loading}
                        {...field}
                        className="rounded-full"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                      >
                        <IoIosMail
                          className="h-10 w-10 text-[#C0C0C0] cursor-pointer"
                          aria-hidden="true"
                        />
                      </Button>
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
              Send
            </Button>
          </form>
        </Form>
      ) : status === "success" ? (
        <div className=" flex gap-6 items-center bg-secondary px-4 py-6 rounded-full">
          <div className=" bg-primary rounded-full p-1">
            <Check className="h-9 w-9 text-white font-bold" />
          </div>
          <p className="text-sm">
            Please check your mail to reset your password
          </p>
        </div>
      ) : (
        <div className=" flex gap-6 items-center bg-secondary px-4 py-6 rounded-full">
          <div className=" bg-primary rounded-full p-1">
            <X className="h-9 w-9 text-white font-bold" />
          </div>
          <p className="text-sm">
            Opps! Looks like email doesn&apos;t exist. Please enter a valid
            email.
          </p>
        </div>
      )}
      <div className="flex gap-2 text-accent-foreground text-sm my-4">
        Don&apos;t Have an Account?
        <Link href={"/register"} className="text-primary">
          Register
        </Link>
      </div>
    </>
  );
}
