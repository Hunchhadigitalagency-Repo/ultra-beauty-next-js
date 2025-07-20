"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerFormSchema } from "@/schemas/auth/auth-schema";
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
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { register } from "@/lib/api/auth/auth-api";
import { useAppDispatch } from "@/redux/hooks";
import {

  setProfileDetails,

} from "@/redux/features/authentication-slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RegisterFormValue = z.infer<typeof registerFormSchema>;

export default function UserRegisterForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (data: RegisterFormValue) => {
    try {
      setLoading(true);

      const res = await register(data);
      console.log(res)
      if (res.status === 201) {
        dispatch(setProfileDetails(res.data?.user));
        toast.success("Registration Successful", {
          description: "You have successfully registered. Please login to continue.",
        });
        router.push("/login");
      }
    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error?.response?.data?.error || error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">
          Register
        </h1>
        <p className="text-xs text-accent-foreground">
          Fill the information correctly to register
        </p>
        <hr />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 pt-2 w-full m-0"
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
          <div className="flex w-full gap-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter the First Name"
                        disabled={loading}
                        {...field}
                        className="rounded-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter the Last Name"
                        disabled={loading}
                        {...field}
                        className="rounded-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Please Enter the Password"
                      disabled={loading}
                      {...field}
                      className="rounded-full"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4 text-[#C0C0C0] cursor-pointer" aria-hidden="true" />
                      ) : (
                        <FaEye
                          className="h-4 w-4 text-[#C0C0C0] cursor-pointer"
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
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Please Enter the Password"
                      disabled={loading}
                      {...field}
                      className="rounded-full"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="h-4 w-4 text-[#C0C0C0] cursor-pointer" aria-hidden="true" />
                      ) : (
                        <FaEye
                          className="h-4 w-4 text-[#C0C0C0] cursor-pointer"
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
            className="ml-auto w-full bg-primary text-white border border-primary hover:bg-white hover:text-primary cursor-pointer rounded-full p-5"
            type="submit"
          >
            Register
          </Button>
        </form>
      </Form>
      <div className="flex gap-2 text-accent-foreground text-sm mt-2 md:my-4">
        Already Have an Account?
        <Link href={"/login"} className="text-primary">
          Login
        </Link>
      </div>
    </>
  );
}
