"use client";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { EUserTypes } from "@/types";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoIosMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import {
  setAccessToken,
  setIsLoggedIn,
  setProfileDetails,
  setRefreshToken,
  setUserType,
} from "@/redux/features/authentication-slice";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "@/lib/api/auth/auth-api";
import { loginFormSchema } from "@/schemas/auth/auth-schema";
import ButtonLoader from "@/components/common/loader/button-loader";

type LoginFormValue = z.infer<typeof loginFormSchema>;

export default function UserLoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValue) => {
    try {
      setLoading(true);
      const res = await login(data);
      if (res.status === 200) {
        dispatch(setAccessToken(res.data?.access));
        dispatch(setRefreshToken(res.data?.refresh));
        dispatch(setProfileDetails(res.data?.user));
        dispatch(setUserType(res.data?.user?.profile?.user_type));
        toast.success("Login Successful", {
          description: "You have successfully logged in.",
        });

        if (
          res.data?.user?.profile?.user_type === EUserTypes.ADMIN ||
          res.data?.user?.profile?.user_type === EUserTypes.SUPER_ADMIN
        ) {
          console.log(
            "I am a admin or superadmin: ",
            res.data?.user?.profile?.user_type
          );
          router.push("/dashboard/home");
        } else {
          console.log("I am a user: ", res.data?.user?.profile?.user_type);
          dispatch(setIsLoggedIn(true));
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error("Login Failed", {
        description: error?.response?.data?.error || error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const res = await googleLogin({
          access_token: tokenResponse.access_token
        });

        if (res.status === 200) {
          dispatch(setAccessToken(res.data?.access));
          dispatch(setRefreshToken(res.data?.refresh));
          dispatch(setProfileDetails(res.data?.user));
          dispatch(setUserType(res.data?.user?.profile?.user_type));
          toast.success("Login Successful", {
            description: "You have successfully logged in.",
          });
          if (
            res.data?.user?.profile?.user_type === EUserTypes.ADMIN ||
            res.data?.user?.profile?.user_type === EUserTypes.SUPER_ADMIN
          ) {
            router.push("/dashboard/home");
          } else {
            dispatch(setIsLoggedIn(true));
            router.push("/");
          }
        }
      } catch (error: any) {
        toast.error("Login Failed", {
          description: error?.response?.data?.error || error?.message,
        });
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error("Google Login Failed", {
        description: "Could not authenticate with Google.",
      });
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold text-primary tracking-tight">
          Login
        </h1>
        <p className="text-xs text-accent-foreground">
          Fill the information correctly to login
        </p>
        <hr />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
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
                        <FaEyeSlash className="h-4 w-4 r text-[#C0C0C0]" aria-hidden="true" />
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
          <div className="flex flex-col sm:flex-row justify-between gap-2 items-center">
            <div className="flex items-center gap-2 text-accent-foreground ">
              <input type="checkbox" />
              <span>Remember Me?</span>
            </div>
            <div>
              <Link href={"/forgot"} className=" text-sm text-primary">
                Forgot Password?
              </Link>
            </div>
          </div>
          <Button
            disabled={loading}
            className="ml-auto w-full rounded-full bg-primary text-white border border-primary hover:bg-white hover:text-primary cursor-pointer p-5"
            type="submit"
          >
            {loading ? <ButtonLoader /> : "Login"}
          </Button>
        </form>
      </Form>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <hr className="flex-grow border-t border-accent-foreground" />
          <span className="text-accent-foreground text-sm">Or</span>
          <hr className="flex-grow border-t border-accent-foreground" />
        </div>
        <div
          className="flex border border-gray-300 rounded-full items-center justify-center gap-4 font-medium py-1 cursor-pointer"
          onClick={() => handleGoogleLogin()}
        >
          <FcGoogle className="w-8 h-8" />
          Continue With Google
        </div>
        <div className="flex gap-2 text-accent-foreground text-sm my-4">
          Don&apos;t Have an Account?
          <Link href={"/register"} className="text-primary">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
